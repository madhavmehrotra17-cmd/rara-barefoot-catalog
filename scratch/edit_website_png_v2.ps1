$Source = @"
using System;
using System.Drawing;

public class WebsiteImageEditorV2 {
    public static void CleanImage(string inputPath, string outputPath) {
        using (Bitmap bmp = new Bitmap(inputPath)) {
            // 1. Paint white over ONLY the specific text boxes, keeping the borders and lines untouched
            using (Graphics g = Graphics.FromImage(bmp)) {
                using (SolidBrush brush = new SolidBrush(Color.White)) {
                    // Erase "WIDE TOE BOX" text under left shoe
                    g.FillRectangle(brush, 180, 835, 260, 55);
                    
                    // Erase "ZERO-DROP & FLEXIBLE" text under right shoe
                    g.FillRectangle(brush, 620, 835, 520, 55);
                    
                    // Erase "TOP SPLAY & SIDEWAYS ZERO-DROP POSTURE" at the bottom center
                    g.FillRectangle(brush, 80, 1000, 1080, 80);
                }
            }

            // 2. Erase the white logo square from the sideways shoe (replace white pixels with neighboring shoe blue)
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
[WebsiteImageEditorV2]::CleanImage("website.png", "website_clean.png")
Write-Output "[SUCCESS] Cleaned website.png (preserving borders) successfully!"
