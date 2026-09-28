import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src = r'C:\Users\sagar\.gemini\antigravity\brain\598edb5e-0ca1-4caa-b882-eff76796f6c0\.user_uploaded\media_1790589791119.png'
im = Image.open(src)
arr = np.array(im, dtype=float)

out_dir = r'client\public\assets\character'
os.makedirs(out_dir, exist_ok=True)
scratch_dir = r'C:\Users\sagar\.gemini\antigravity\brain\598edb5e-0ca1-4caa-b882-eff76796f6c0\scratch'

# -------------------------------------------------------------------------
# STEP 1: TRUE TRANSPARENCY & SILHOUETTE ISOLATION (No Black Halos / Rectangles)
# -------------------------------------------------------------------------
alpha = arr[:, :, 3]

# 1. Clean background haze (alpha < 10 set to pure 0)
mask_bg = alpha < 10
arr[mask_bg] = 0

# 2. Defringe semi-transparent edge pixels against black pre-multiplication
semi = (alpha >= 10) & (alpha < 248)
for c in range(3):
    arr[semi, c] = np.clip(arr[semi, c] / (alpha[semi] / 253.0), 0, 255)

# 3. Inside solid character, set alpha to 255
solid = alpha >= 248
arr[solid, 3] = 255

clean_char = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
clean_arr = np.array(clean_char)

# Save the master transparent isolated character
clean_char.save(os.path.join(out_dir, 'character-isolated.png'))
print('Saved character-isolated.png with TRUE transparency')

# -------------------------------------------------------------------------
# STEP 2: EXACT ORIGINAL EYE SOCKET CONTOURS (media_1790589791119.png)
# -------------------------------------------------------------------------
def cubic_bezier(p0, p1, p2, p3, n=40):
    pts = []
    for t in np.linspace(0, 1, n):
        x = (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0]
        y = (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1]
        pts.append((x, y))
    return pts

# Left eye exact socket opening (original 100% size):
# Temporal corner: (244.5, 174.5)
# Top lash center: (264.5, 161.0)
# Nasal corner: (284.5, 175.5)
# Bottom rim center: (264.5, 187.0)
p_l = [
    (244.5, 174.5), (248.5, 165.5), (256.5, 161.0), (264.5, 161.0),
    (272.5, 161.0), (280.0, 166.5), (284.5, 175.5),
    (280.0, 183.0), (272.5, 187.0), (264.5, 187.0),
    (255.5, 187.0), (248.5, 182.0)
]
curve_l = cubic_bezier(p_l[0], p_l[1], p_l[2], p_l[3]) + \
          cubic_bezier(p_l[3], p_l[4], p_l[5], p_l[6]) + \
          cubic_bezier(p_l[6], p_l[7], p_l[8], p_l[9]) + \
          cubic_bezier(p_l[9], p_l[10], p_l[11], p_l[0])

# Right eye exact socket opening (original 100% size):
# Nasal corner: (321.0, 176.5)
# Top lash center: (341.0, 161.0)
# Temporal corner: (361.5, 174.5)
# Bottom rim center: (341.0, 187.0)
p_r = [
    (321.0, 176.5), (325.5, 166.5), (333.5, 161.0), (341.0, 161.0),
    (349.0, 161.0), (357.0, 165.5), (361.5, 174.5),
    (357.0, 182.0), (349.0, 187.0), (341.0, 187.0),
    (332.5, 187.0), (325.5, 183.0)
]
curve_r = cubic_bezier(p_r[0], p_r[1], p_r[2], p_r[3]) + \
          cubic_bezier(p_r[3], p_r[4], p_r[5], p_r[6]) + \
          cubic_bezier(p_r[6], p_r[7], p_r[8], p_r[9]) + \
          cubic_bezier(p_r[9], p_r[10], p_r[11], p_r[0])

# -------------------------------------------------------------------------
# STEP 3: EXTRACT ORIGINAL IRISES FROM media_1790589791119.png
# -------------------------------------------------------------------------
cx_l, cy_l = 266.1, 173.9
r_l = 10.8 # true radius of left iris

cx_r, cy_r = 338.0, 175.0
r_r = 9.8  # true radius of right iris

def extract_original_iris(cx, cy, r_iris):
    # 36x36 canvas centered at 18, 18
    iris_im = Image.new('RGBA', (36, 36), (0, 0, 0, 0))
    for py in range(36):
        for px in range(36):
            dx = px - 18.0
            dy = py - 18.0
            dist = np.hypot(dx, dy)
            if dist <= r_iris + 0.6:
                gx = int(round(cx + dx))
                gy = int(round(cy + dy))
                if dist <= r_iris - 0.4:
                    alpha_factor = 1.0
                else:
                    alpha_factor = (r_iris + 0.6 - dist) / 1.0
                c = clean_arr[gy, gx].copy()
                c[3] = int(round(c[3] * alpha_factor))
                iris_im.putpixel((px, py), tuple(c))
    return iris_im

orig_iris_l = extract_original_iris(cx_l, cy_l, r_l)
orig_iris_r = extract_original_iris(cx_r, cy_r, r_r)

orig_iris_l.save(os.path.join(out_dir, 'iris-left.png'))
orig_iris_r.save(os.path.join(out_dir, 'iris-right.png'))
print('Saved original iris-left.png and iris-right.png')

# -------------------------------------------------------------------------
# STEP 4: STATIC BASE CHARACTER WITH CONTINUOUS 3D SCLERA
# -------------------------------------------------------------------------
# Generate 3D sclera behind the irises
sclera_arr = np.zeros((1024, 603, 4), dtype=np.uint8)

def get_3d_sclera(eye, y, x, cx, cy):
    # Normalized Y inside eye socket (161 to 187)
    t = (y - 161.0) / 26.0
    t = max(0.0, min(1.0, t))
    if eye == 'right':
        # Authentic lighting from right:
        if t < 0.25:
            s = t / 0.25
            c = (1 - s) * np.array([125, 105, 98]) + s * np.array([225, 220, 218])
        elif t < 0.50:
            s = (t - 0.25) / 0.25
            c = (1 - s) * np.array([225, 220, 218]) + s * np.array([254, 254, 253])
        elif t < 0.82:
            s = (t - 0.50) / 0.32
            c = (1 - s) * np.array([254, 254, 253]) + s * np.array([246, 238, 230])
        else:
            s = (t - 0.82) / 0.18
            c = (1 - s) * np.array([246, 238, 230]) + s * np.array([230, 212, 202])
        dx = abs(x - cx) / 19.0
        c = c * (1.0 - 0.05 * (dx ** 2))
    else:
        if t < 0.25:
            s = t / 0.25
            c = (1 - s) * np.array([120, 105, 100]) + s * np.array([220, 212, 208])
        elif t < 0.50:
            s = (t - 0.25) / 0.25
            c = (1 - s) * np.array([220, 212, 208]) + s * np.array([252, 250, 250])
        elif t < 0.82:
            s = (t - 0.50) / 0.32
            c = (1 - s) * np.array([252, 250, 250]) + s * np.array([242, 232, 224])
        else:
            s = (t - 0.82) / 0.18
            c = (1 - s) * np.array([242, 232, 224]) + s * np.array([226, 206, 196])
        dx = abs(x - cx) / 19.0
        c = c * (1.0 - 0.05 * (dx ** 2))
    return np.clip(c, 0, 255).astype(np.uint8)

# Socket masks for sclera
mask_sclera = Image.new('L', (603, 1024), 0)
d_sc = ImageDraw.Draw(mask_sclera)
d_sc.polygon(curve_l, fill=255)
d_sc.polygon(curve_r, fill=255)
mask_sclera = mask_sclera.filter(ImageFilter.GaussianBlur(0.6))

for y in range(158, 192):
    for x in range(240, 290):
        c = get_3d_sclera('left', y, x, cx_l, cy_l)
        sclera_arr[y, x] = [c[0], c[1], c[2], 255]
    for x in range(318, 366):
        c = get_3d_sclera('right', y, x, cx_r, cy_r)
        sclera_arr[y, x] = [c[0], c[1], c[2], 255]

sclera_img = Image.fromarray(sclera_arr)
base_char = clean_char.copy()
base_char.paste(sclera_img, (0, 0), mask_sclera)
base_char.save(os.path.join(out_dir, 'character-static-base.png'))
print('Saved character-static-base.png')

# -------------------------------------------------------------------------
# STEP 5: EYELIDS / EYELASH RIM OVERLAY (In Front of Moving Irises)
# -------------------------------------------------------------------------
# We extract only the eye/eyelid region (Y: 155 to 195, X: 235 to 370)
# Outside this local region, alpha is 0.0. Inside, the socket is transparent.
# This GUARANTEES zero black background, zero halos, zero rectangular clipping!
overlay_im = Image.new('RGBA', (603, 1024), (0, 0, 0, 0))
overlay_arr = np.array(overlay_im)

# Bounding box around eyes:
m_sc_arr = np.array(mask_sclera)

for y in range(155, 195):
    for x in range(235, 370):
        # We only keep the eyelids & eyelashes rim (where mask is transitioning)
        # If inside the eye socket (mask > 0), opacity is 255 - mask
        # If outside the eye socket, opacity is 255 (the original skin & lashes)
        hole_alpha = 255 - m_sc_arr[y, x]
        if hole_alpha > 0:
            c = clean_arr[y, x].copy()
            c[3] = int(round(c[3] * (hole_alpha / 255.0)))
            overlay_arr[y, x] = c

overlay_im = Image.fromarray(overlay_arr)
overlay_im.save(os.path.join(out_dir, 'eyelids-rim-overlay.png'))
print('Saved eyelids-rim-overlay.png with localized alpha')

# -------------------------------------------------------------------------
# STEP 6: NATURAL BLINK OVERLAY
# -------------------------------------------------------------------------
poly_l = Image.new('L', (603, 1024), 0)
ImageDraw.Draw(poly_l).polygon(curve_l, fill=255)
arr_poly_l = np.array(poly_l)

poly_r = Image.new('L', (603, 1024), 0)
ImageDraw.Draw(poly_r).polygon(curve_r, fill=255)
arr_poly_r = np.array(poly_r)

blink_arr = clean_arr.copy()

for eye_name, arr_poly, (cx, x_min, x_max) in [('left', arr_poly_l, (cx_l, 244, 286)), ('right', arr_poly_r, (cx_r, 320, 363))]:
    for x in range(x_min, x_max):
        ys = np.where(arr_poly[:, x] > 0)[0]
        if len(ys) > 0:
            y_top = ys[0]
            y_bottom = ys[-1]
            h = y_bottom - y_top
            for y in range(y_top, y_bottom + 1):
                t = (y - y_top) / float(max(1, h))
                src_y = int(150 + t * 9)
                color = clean_arr[src_y, x].copy()
                
                if t > 0.88:
                    color[0] = int(color[0] * 0.22)
                    color[1] = int(color[1] * 0.18)
                    color[2] = int(color[2] * 0.18)
                elif t > 0.72:
                    darken = 1.0 - (t - 0.72) * 0.7
                    color[0] = int(color[0] * darken)
                    color[1] = int(color[1] * darken)
                    color[2] = int(color[2] * darken)
                    
                blink_arr[y, x] = color

# Localized blink overlay:
blink_overlay_arr = np.zeros((1024, 603, 4), dtype=np.uint8)
m_l = np.array(poly_l.filter(ImageFilter.GaussianBlur(0.5)))
m_r = np.array(poly_r.filter(ImageFilter.GaussianBlur(0.5)))
m_total = np.maximum(m_l, m_r)

for y in range(155, 195):
    for x in range(235, 370):
        if m_total[y, x] > 0:
            blink_overlay_arr[y, x, :3] = blink_arr[y, x, :3]
            blink_overlay_arr[y, x, 3] = m_total[y, x]

blink_overlay = Image.fromarray(blink_overlay_arr)
blink_overlay.save(os.path.join(out_dir, 'eyelids-blink.png'))
print('Saved eyelids-blink.png')

print('\nALL PRODUCTION ASSETS COMPILED SUCCESSFULLY!')
