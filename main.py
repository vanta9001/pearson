import os
import shutil
import random

# Source image filenames
source_images = [
    "3307.webp",
    "download.jpg",
    "download (1).jpg",
    "download (2).jpg"
]

# List of target image paths (only use the filename part)
target_paths = [
    "images/800x800-conical-lines.png",
    "images/800x800-PICTOGRAMS-TURQUOISE-35.png",
    "images/1600x800-ctr-GettyImages-1806392583.jpg",
    "images/1600x800-ctr-GettyImages-2177942089.jpg",
    "images/1600x800-GettyImages-216983674.jpg",
    "images/2400x800-GettyImages-1663279091-alt.jpg",
    "images/apple-touch-icon.png",
    "images/blue-globe-evolution.png",
    "images/favicon-dark-16.png",
    "images/favicon-dark-20.png",
    "images/favicon-dark-24.png",
    "images/favicon-dark-32.png",
    "images/favicon-dark-96.png",
    "images/favicon-dark.svg",
    "images/favicon-light-16.png",
    "images/favicon-light-20.png",
    "images/favicon-light-24.png",
    "images/favicon-light-32.png",
    "images/favicon-light-96.png",
    "images/favicon-light.svg",
    "images/fontawesome-webfont.svg",
    "images/ic_chevron_white.svg",
    "images/icon--alert.svg",
    "images/icon--checkmark.svg",
    "images/icon--close.svg",
    "images/icon--exclamation.svg",
    "images/icon--info.svg",
    "images/icon-chevron-right--pearson-blue.svg",
    "images/icon-chevron-right--soft-black.svg",
    "images/icon-facebook.svg",
    "images/icon-instagram.svg",
    "images/icon-linkedin.svg",
    "images/icon-platform.svg",
    "images/icon-tiktok.svg",
    "images/icon-twitter.svg",
    "images/icon-youtube.svg",
    "images/img_1.jpeg",
    "images/img_1.png",
    "images/img_2.jpeg",
    "images/img_2.png",
    "images/img_3.jpeg",
    "images/img_3.png",
    "images/img_4.jpeg",
    "images/img_4.png",
    "images/img_5.jpeg",
    "images/img_5.png",
    "images/img_6.jpeg",
    "images/img_6.png",
    "images/img_7.jpeg",
    "images/img_7.png",
    "images/img_8.jpeg",
    "images/img_8.png",
    "images/img_9.jpeg",
    "images/img_9.png",
    "images/img_10.jpeg",
    "images/img_10.png",
    "images/img_11.jpeg",
    "images/img_11.png",
    "images/img_12.jpeg",
    "images/img_12.png",
    "images/img_13.jpeg",
    "images/img_13.png",
    "images/img_14.jpeg",
    "images/img_14.png",
    "images/img_15.jpeg",
    "images/img_16.jpeg",
    "images/img_17.jpeg",
    "images/img_18.jpeg",
    "images/img_19.jpeg",
    "images/img.jpeg",
    "images/img.png",
    "images/loading-indicator--bubble-color-ui-06.svg",
    "images/logo-full-white.svg",
    "images/maxresdefault.jpg",
    "images/sprite--play-pause.svg",
    "images/sprite-account.svg",
    "images/sprite-alerts.svg",
    "images/sprite-clickable-card-controls.svg",
    "images/sprite-controls.svg",
    "images/sprite-creditcards.svg",
    "images/sprite-ecommerce.svg",
    "images/sprite-flags.svg",
    "images/sprite-navigation.svg",
    "images/sprite-platform.svg",
    "images/sprite-social.svg",
    "images/sprite-support.svg",
    "images/texture-linear-norepeat-01.svg",
    "images/texture-linear-norepeat-02-bottom-up.svg",
    "images/texture-linear-norepeat-02.svg",
    "images/texture-linear-norepeat-03.svg",
    "images/texture-linear-repeat-01.svg",
    "images/texture-linear-repeat-02.svg",
    "images/texture-linear-repeat-03.svg",
    "images/waves-fucsia-3-pearsonpurple-slow-16x9-l2r-hires-v01.png",
    "images/weibo-icon.svg",
    "images/youtube-play-icon.png"
]

# Extract just the filenames (without 'images/')
target_filenames = [os.path.basename(path) for path in target_paths]

# Shuffle and assign images as evenly as possible
num_sources = len(source_images)
assignments = [source_images[i % num_sources] for i in range(len(target_filenames))]
random.shuffle(assignments)  # Shuffle to randomize which image gets assigned

# Duplicate and rename
for src, target_name in zip(assignments, target_filenames):
    shutil.copy(src, target_name)
    print(f"Copied {src} -> {target_name}")

print("\n✅ Done. All files copied to the root directory.")
