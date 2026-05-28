$Source = @"
using System;
using System.Drawing;

public class WebsiteImageEditor {
    public static void CleanImage(string inputPath, string outputPath) {
        using (Bitmap bmp = new Bitmap(inputPath)) {
            // 1. Paint white over all text regions at the bottom (y >= 830)
            using (Graphics g = Graphics.FromImage(bmp)) {
                using (SolidBrush brush = new SolidBrush(Color.White)) {
                    // Erase "WIDE TOE BOX", "ZERO-DROP & FLEXIBLE", and "TOP SPLAY & SIDEWAYS ZERO-DROP POSTURE"
                    g.FillRectangle(brush, 0, 830, bmp.Width, bmp.Height - 830);
                }
            }

            // 2. Erase the white logo square from the sideways shoe (replace white pixels with neighboring shoe blue)
            // Region: x from 750 to 900, y from 580 to 720
            Color shoeBlue = bmp.GetPixel(880, 650); // Sample non-white slate blue from the shoe
            for (int x = 750; x < 900; x++) {
                if (x >= bmp.Width) continue;
                for (int y = 580; y < 720; y++) {
                    if (y >= bmp.Height) continue;
                    Color c = bmp.GetPixel(x, y);
                    // If pixel is very bright (white logo), replace it with the slate blue
                    if (c.R > 220 && c.G > 220 && c.B > 220) {
                        bmp.SetPixel(x, y, shoeBlue);
                    }
                }
            }

            bmp.Save(outputPath, System.Drawing.Imaging.ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $Source -ReferencedAssemblies "System.Drawing"
[WebsiteImageEditor]::CleanImage("website.png", "website_clean.png")
Write-Output "[SUCCESS] Cleaned website.png successfully!"
