"""Check the generated site's navigation, content and complete photo archive."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.elements = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


pages = {p.name: Page(p.read_text()) for p in ROOT.glob('*.html')}
assert len(pages) == 10, 'Expected nine pages and a 404 page'
for name, page in pages.items():
    source = (ROOT / name).read_text()
    assert '\u2014' not in source, f'Em dash in {name}'
    assert sum(tag == 'h1' for tag, _ in page.elements) == 1, name
    ids = [a['id'] for _, a in page.elements if 'id' in a]
    assert len(ids) == len(set(ids)), f'Duplicate ID in {name}'
    assert any(t == 'meta' and a.get('name') == 'description' for t, a in page.elements)
    for tag, attrs in page.elements:
        if tag == 'img':
            assert 'alt' in attrs, f'Missing image alternative in {name}'
        for key in ('href', 'src', 'data-src'):
            value = attrs.get(key)
            if not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc:
                continue
            path = unquote(url.path)
            target = ROOT / path.lstrip("/") if path else ROOT / name
            assert target.exists(), f'Broken local link: {name} -> {value}'
            if url.fragment and target.suffix == '.html':
                target_ids = [a.get('id') for _, a in pages[target.name].elements]
                assert url.fragment in target_ids, f'Broken anchor: {value}'

manifest = json.loads((ROOT / 'assets/photos/manifest.json').read_text())
assert len(manifest) == 88
archive = [a for _, a in pages['gallery.html'].elements if a.get('class') == 'archive-item']
assert {int(a['data-id']) for a in archive} == {photo["id"] for photo in manifest}
for photo in manifest:
    for key in ('filename', 'thumbnail'):
        assert (ROOT / 'assets/photos' / photo[key]).stat().st_size > 0
for css in (ROOT / 'assets').rglob('*.css'):
    for value in re.findall(r'url\([\"\']?([^\)\"\']+)', css.read_text()):
        assert (css.parent / value).exists(), f'Missing CSS asset: {value}'
classes = (ROOT / 'classes.html').read_text()
assert '3 December 2026' in classes and '8431534682' in classes
assert 'location-qr.png' in classes and '16th Cross' in classes
assert '90% marks, earning distinction' in (ROOT / 'about.html').read_text()
assert 'D. V. Gundappa' in (ROOT / 'pratyaveksini.html').read_text()
print('Passed: 10 pages, local links and anchors, metadata, image alternatives, 88 photos, class details and no em dashes.')

for name in pages:
    source = (ROOT / name).read_text()
    assert "tel:" not in source, f"Phone link must open WhatsApp: {name}"
    assert "https://wa.me/918431534682" in source
assert "Online classes" in (ROOT / "classes.html").read_text()
assert "nrittahasini-poem.png" in (ROOT / "pratyaveksini.html").read_text()
print("Passed: direct WhatsApp access on every page, online classes and the supplied poem.")
