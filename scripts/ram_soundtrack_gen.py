"""
Soundtrack generator for "What RAM Actually Does In Your Computer?"
(55.0 s, 44.1 kHz stereo, 9:16 Vertical Short).
Synthesised from raw waveforms with numpy/scipy.
"""
import numpy as np
from scipy import signal
from scipy.io import wavfile

FPS = 30
DUR = 55.0
sr = 44100
N = int(DUR * sr)
rng = np.random.RandomState(42)

dry = np.zeros((N, 2))
wet = np.zeros((N, 2))

def T(t): return int(t * sr)

def put(buf, t0, x, g=1.0, pan=0.0, rev=0.0):
    i = T(t0)
    if i < 0:
        x = x[-i:]
        i = 0
    n = min(len(x), N - i)
    if n <= 0: return
    l = g * np.cos((pan + 1) * np.pi / 4)
    r = g * np.sin((pan + 1) * np.pi / 4)
    dry[i:i+n, 0] += x[:n] * l
    dry[i:i+n, 1] += x[:n] * r
    if rev > 0:
        wet[i:i+n, 0] += x[:n] * l * rev
        wet[i:i+n, 1] += x[:n] * r * rev

def tt(d): return np.arange(int(d * sr)) / sr

def sine(f, d, dec=None, att=0.003):
    t = tt(d)
    f = f if np.ndim(f) else f + 0 * t
    ph = 2 * np.pi * np.cumsum(f) / sr
    e = np.minimum(t / att, 1) * (np.exp(-t / dec) if dec else 1)
    return np.sin(ph) * e

def saw(f, d):
    t = tt(d)
    ph = (np.cumsum(f + 0 * t) / sr) % 1
    return 2 * ph - 1

def noise(d): return rng.randn(int(d * sr))

def lp(x, cutoff):
    b, a = signal.butter(2, cutoff / (sr/2), btype='low')
    return signal.lfilter(b, a, x)

def mtof(m): return 440.0 * (2 ** ((m - 69) / 12))

def boom(t0, g=1.0, f0=50, d=1.5):
    t = tt(d)
    env = np.exp(-t * 4.5)
    x = env * (np.sin(2 * np.pi * f0 * t * (1 - 0.4 * t / d)) + 0.3 * noise(d) * np.exp(-t * 12))
    put(dry, t0, x, g=g, pan=0, rev=0.4)

def whoosh(t0, d=1.2, f1=200, f2=4000, g=0.4, pan=0):
    t = tt(d)
    f = np.linspace(f1, f2, len(t))
    x = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-t * 2.2) * (0.5 + 0.5 * noise(d))
    put(dry, t0, lp(x, 6000), g=g, pan=pan, rev=0.35)

def riser(t0, d=2.0, g=0.3):
    t = tt(d)
    f = 80 + 1200 * (t / d) ** 1.8
    x = np.sin(2 * np.pi * np.cumsum(f) / sr) * (t / d) * np.exp(-(d - t) * 0.8)
    put(dry, t0, x, g=g, pan=0, rev=0.5)

def zap(t0, d=0.4, f1=1200, f2=200, g=0.25):
    t = tt(d)
    f = np.linspace(f1, f2, len(t))
    x = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-t * 8)
    put(dry, t0, x, g=g, pan=rng.uniform(-0.6, 0.6), rev=0.2)

def blip(t0, f, d=0.08, g=0.12):
    x = sine(f, d, dec=0.04)
    put(dry, t0, x, g=g, pan=rng.uniform(-0.7, 0.7))

def ping(t0, f, g=0.1, d=2.0):
    x = sine(f, d, dec=0.9, att=0.001)
    put(dry, t0, x, g=g, pan=rng.uniform(-0.5, 0.5), rev=0.6)

# --- Timeline ---
# 0s - 8s: Intro atmosphere
whoosh(0.3, 2.5, 80, 2500, 0.35, -0.3)
riser(1.5, 3.0, 0.25)
boom(4.2, 0.6, 42, 2.0)
for i in range(6):
    blip(5.0 + 0.35 * i, mtof(60 + (i % 3) * 7), 0.06, 0.08)

# 8s - 14s: Title impact
boom(8.5, 0.9, 38, 2.2)
whoosh(9.0, 1.8, 300, 5000, 0.4, 0.2)
for m in (48, 55, 60, 67):
    ping(10.2, mtof(m), 0.12, 2.5)

# 14s - 28s: Speed comparison tension
for i in range(12):
    blip(14.5 + 0.9 * i, mtof(int(rng.choice([64, 67, 71, 74, 76]))), 0.07, 0.09)
whoosh(18.0, 1.5, 150, 3500, 0.3, -0.4)
boom(22.5, 0.7, 45, 1.8)
riser(24.0, 2.5, 0.28)

# 28s - 42s: Data highway / system bus
for i in range(18):
    blip(28.5 + 0.55 * i, mtof(int(rng.choice([72, 76, 79, 84, 88]))), 0.05, 0.1)
whoosh(32.0, 2.0, 200, 4500, 0.35, 0.3)
boom(36.8, 0.8, 40, 2.0)
zap(37.5, 0.5, 2000, 150, 0.2)

# 42s - 50s: Data Stream & Memory Saturation
whoosh(42.2, 1.8, 400, 5500, 0.45, 0)
for i in range(24):
    blip(43.0 + 0.12 * i, mtof(int(rng.choice([76, 79, 83, 88, 91, 95]))), 0.08, 0.1)
boom(46.8, 0.75, 45, 1.8)
zap(46.7, 0.6, 1800, 200, 0.25)

# 50s - 55s: Outro & System Harmony
riser(50.5, 1.5, 0.3)
boom(51.2, 0.9, 48, 2.5)
whoosh(51.0, 2.0, 300, 6000, 0.5, 0)
for m in (60, 67, 72, 76, 79, 84, 88):
    ping(52.0, mtof(m), 0.11, 3.5)
boom(53.2, 0.6, 40, 2.0)

# --- Master Mix with Convolution Reverb & Limiter ---
ir_n = int(2.0 * sr)
ir = rng.randn(ir_n) * np.exp(-np.arange(ir_n) / sr * 2.8)
ir = lp(ir, 5500)
ir = np.stack([ir, np.roll(ir, 97) * 0.9], 1)
wet_c = np.stack([signal.fftconvolve(wet[:, c], ir[:, c], 'full')[:N] for c in (0, 1)], 1) * 0.05

mix = dry + wet_c
mix *= np.interp(np.arange(N) / sr, [0, 0.3, 54.2, 55.0], [0, 1, 1, 0])[:, None]
mix = np.tanh(mix * 1.15)
mix = mix / np.max(np.abs(mix)) * 0.89

out_wav = 'public/audio/ram_soundtrack_55s.wav'
wavfile.write(out_wav, sr, (mix * 32767).astype(np.int16))
print('Successfully generated 55s soundtrack:', out_wav)
