Converting video

```
ffmpeg -i portal.mov -qscale 0 portal.mp4

```

```
ffmpeg -i portal.mp4 -filter_complex 'fps=10,scale=320:-1:flags=lanczos,split [o1] [o2];[o1] palettegen [p]; [o2] fifo [o3];[o3] [p] paletteuse' portal.gif
```

```
ffmpeg -i portal.mp4 -vf "select=eq(n\,0)" -q:v 3 portal.png

```
