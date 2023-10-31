const messages = [
  'Reading Wtns',
  'Reading Coeffs',
  'Building ABC',
  'QAP AB',
  'QAP C',
  'IFFT_A: fft 14 mix start',
  'IFFT_A: fft 14 mix end',
  'IFFT_A: fft 14 join',
  'FFT_A: fft 14 mix start',
  'FFT_A: fft 14 mix end',
  'FFT_A: fft 14 join',
  'IFFT_B: fft 14 mix start',
  'IFFT_B: fft 14 mix end',
  'IFFT_B: fft 14 join',
  'FFT_B: fft 14 mix start',
  'FFT_B: fft 14 mix end',
  'FFT_B: fft 14 join',
  'IFFT_C: fft 14 mix start',
  'IFFT_C: fft 14 mix end',
  'IFFT_C: fft 14 join',
  'FFT_C: fft 14 mix start',
  'FFT_C: fft 14 mix end',
  'FFT_C: fft 14 join',
  'Reading A Points',
  'Reading B1 Points',
  'Reading B2 Points',
  'Reading C Points',
  'Reading H Points',
]

export default function getProofProgress(log: string) {
  const position = messages.findIndex((message) => log.startsWith(message))
  if (position === -1) return null
  return (position * 100) / messages.length
}
