import AppKit

let width = 1200
let height = 630
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height,
  bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
  colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)

func color(_ red: CGFloat, _ green: CGFloat, _ blue: CGFloat) -> NSColor {
  NSColor(red: red / 255, green: green / 255, blue: blue / 255, alpha: 1)
}
func text(_ value: String, x: CGFloat, y: CGFloat, font: NSFont, ink: NSColor) {
  (value as NSString).draw(at: NSPoint(x: x, y: y),
    withAttributes: [.font: font, .foregroundColor: ink])
}

color(243, 244, 238).setFill()
NSBezierPath(rect: NSRect(x: 0, y: 0, width: width, height: height)).fill()
let ink = color(23, 26, 23)
let muted = color(74, 79, 73)
let blue = color(58, 85, 201)
text("</>", x: 80, y: 490, font: .monospacedSystemFont(ofSize: 38, weight: .semibold), ink: blue)
text("John Welch", x: 80, y: 305, font: NSFont(name: "Georgia", size: 92)!, ink: ink)
text("Software Engineer", x: 84, y: 245, font: .systemFont(ofSize: 32, weight: .medium), ink: muted)
text("Applied AI · Backend infrastructure", x: 84, y: 185, font: .systemFont(ofSize: 28), ink: muted)
blue.setFill()
NSBezierPath(rect: NSRect(x: 84, y: 128, width: 80, height: 4)).fill()
text("john-welch.dev", x: 84, y: 65, font: .monospacedSystemFont(ofSize: 22, weight: .regular), ink: muted)

NSGraphicsContext.restoreGraphicsState()
let output = CommandLine.arguments.dropFirst().first ?? "public/social-preview.png"
try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: output))
print("Generated \(output) (\(width)×\(height))")
