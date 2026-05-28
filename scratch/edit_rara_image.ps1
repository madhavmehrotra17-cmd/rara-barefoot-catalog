$Source = @"
using System;
using System.Drawing;

public class ImageEditor {
    public static void CleanImage(string inputPath, string outputPath) {
        using (Bitmap bmp = new Bitmap(inputPath)) {
            // 1. Paint white over surrounding text regions
            using (Graphics g = Graphics.FromImage(bmp)) {
                using (SolidBrush brush = new SolidBrush(Color.White)) {
                    // Erase headers
                    g.FillRectangle(brush, 100, 80, 1300, 160);
                    g.FillRectangle(brush, 1520, 80, 1380, 160);
                    // Erase left arrow + text
                    g.FillRectangle(brush, 1140, 840, 320, 940);
                    // Erase middle arrow + text
                    g.FillRectangle(brush, 1540, 1840, 380, 220);
                    // Erase right arrow + text
                    g.FillRectangle(brush, 2700, 1880, 280, 600);
                    // Erase bottom text
                    g.FillRectangle(brush, 500, 2760, 450, 120);
                }
            }

            // 2. Erase R logo (replace white pixels with neighboring blue)
            Color panelBlue = bmp.GetPixel(2120, 1520);
            for (int x = 2100; x < 2480; x++) {
                for (int y = 1500; y < 1850; y++) {
                    Color c = bmp.GetPixel(x, y);
                    if (c.R > 210 && c.G > 210 && c.B > 210) {
                        bmp.SetPixel(x, y, panelBlue);
                    }
                }
            }

            // 3. Erase TRU BIOMECHANICS text (replace white pixels with neighboring blue)
            Color meshBlue = bmp.GetPixel(2170, 2120);
            for (int x = 2150; x < 2550; x++) {
                for (int y = 2100; y < 2500; y++) {
                    Color c = bmp.GetPixel(x, y);
                    if (c.R > 210 && c.G > 210 && c.B > 210) {
                        bmp.SetPixel(x, y, meshBlue);
                    }
                }
            }

            bmp.Save(outputPath, System.Drawing.Imaging.ImageFormat.Jpeg);
        }
    }
}
"@

Add-Type -TypeDefinition $Source -ReferencedAssemblies "System.Drawing"
[ImageEditor]::CleanImage("rara_original.jpg", "rara_visual_clean.jpg")
Write-Output "[SUCCESS] Cleaned image successfully!"
