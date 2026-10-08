"""Build velvet-pnl-card.html (single self-contained file) from src.html + images in this folder.
Usage: python3 build.py
"""
import base64, pathlib
here = pathlib.Path(__file__).parent
s = (here / 'src.html').read_text()
def b(name, mime):
    return f"data:{mime};base64," + base64.b64encode((here / name).read_bytes()).decode()
s = (s.replace('{{BG}}', b('bg.jpg', 'image/jpeg'))
      .replace('{{GIFT}}', b('gift.png', 'image/png'))
      .replace('{{LOGO}}', b('logo.png', 'image/png'))
      .replace('{{ETH}}', b('eth.png', 'image/png')))
(here / 'velvet-pnl-card.html').write_text(s)
print('built velvet-pnl-card.html', len(s), 'bytes')
