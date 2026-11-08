# What RAM Actually Does in Your Computer? (55s Remotion Explainer)

A 55-second (1650 frames @ 30 FPS) vertical (9:16) motion-graphics explainer created with Remotion and React.

## Project Structure
- `src/Root.tsx`: Composition setup (1080×1920 @ 30 FPS, 1650 frames).
- `src/RamExplainer.tsx`: Master timeline with 4 orchestrated scenes.
- `src/scenes/`:
  - `IntroScene.tsx`: Introduction & 3D RAM perspective (0s – 14s)
  - `SpeedComparisonScene.tsx`: NVMe SSD vs DDR5 RAM throughput (14s – 28s)
  - `DataHighwayScene.tsx`: System bus, memory controller & CPU pipeline (28s – 42s)
  - `OutroSummaryScene.tsx`: The golden rule of RAM (42s – 55s)
- `src/components/`:
  - `RamStick3D.tsx`, `Cpu3D.tsx`, `DataConduit.tsx`
- `scripts/ram_soundtrack_gen.py`: Procedural 55s soundtrack generator (numpy/scipy)

## Quick Start (local)
```bash
# 1. Install dependencies
npm install

# 2. Generate the soundtrack (requires python3-numpy + python3-scipy)
mkdir -p public/audio
python3 scripts/ram_soundtrack_gen.py

# 3. Open interactive Remotion Studio preview
npm start

# 4. Render 1080p vertical MP4
npm run build
```
Output MP4 will be saved to `out/ram-explainer.mp4`.

## GitHub Actions
Every push to `main` (and manual workflow dispatch) runs a full render.

1. Go to the **Actions** tab of this repository.
2. Open the latest **Render RAM Explainer MP4** workflow run.
3. Download the artifact named **`ram-explainer-mp4`** — it contains the finished video.

## Notes
- The “3D” look is achieved with CSS 3D transforms + perspective (lightweight, no WebGL required for render).
- Soundtrack is generated on-the-fly in CI so the binary is not committed.
