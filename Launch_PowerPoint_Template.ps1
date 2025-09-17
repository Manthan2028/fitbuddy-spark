# Simple PowerPoint Template Launcher
Write-Host "System Architecture Diagram Template Creator" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Yellow

# Define paths
$DocumentsPath = [Environment]::GetFolderPath("MyDocuments")
$WarpPath = Join-Path $DocumentsPath "Warp"
$TemplatePath = Join-Path $WarpPath "System_Architecture_Template.pptx"

Write-Host "Creating PowerPoint template..." -ForegroundColor Blue

try {
    # Create PowerPoint application
    $PowerPoint = New-Object -ComObject PowerPoint.Application
    $PowerPoint.Visible = $true
    
    # Create new presentation
    $Presentation = $PowerPoint.Presentations.Add()
    
    # Set slide size to 16:9
    $Presentation.PageSetup.SlideSize = 7
    
    Write-Host "Created PowerPoint application successfully!" -ForegroundColor Green
    
    # Remove default slide
    $Presentation.Slides.Item(1).Delete()
    
    # Add title slide
    $TitleSlide = $Presentation.Slides.Add(1, 11)
    $TitleSlide.Shapes.Title.TextFrame.TextRange.Text = "System Architecture Diagram"
    
    # Add subtitle
    $SubtitleShape = $TitleSlide.Shapes.AddTextbox(1, 100, 200, 800, 100)
    $SubtitleShape.TextFrame.TextRange.Text = "Modern Web Application Architecture Template"
    $SubtitleShape.TextFrame.TextRange.Font.Size = 18
    
    # Add main diagram slide
    $DiagramSlide = $Presentation.Slides.Add(2, 12)
    
    # Add slide title
    $TitleShape = $DiagramSlide.Shapes.AddTextbox(1, 50, 20, 800, 50)
    $TitleShape.TextFrame.TextRange.Text = "System Architecture Overview"
    $TitleShape.TextFrame.TextRange.Font.Size = 32
    $TitleShape.TextFrame.TextRange.Font.Bold = $true
    
    Write-Host "Added slides successfully!" -ForegroundColor Green
    
    # Save the presentation
    $Presentation.SaveAs($TemplatePath)
    Write-Host "Template saved to: $TemplatePath" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "SUCCESS! Your PowerPoint template is ready!" -ForegroundColor Green
    Write-Host "Template location: $TemplatePath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Use Insert -> Icons to add system components" -ForegroundColor White
    Write-Host "2. Apply the color scheme from the documentation" -ForegroundColor White
    Write-Host "3. Add arrows using Insert -> Shapes -> Connectors" -ForegroundColor White
    Write-Host "4. Reference the instruction files for detailed guidance" -ForegroundColor White
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "PowerPoint may not be installed or accessible." -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual Alternative:" -ForegroundColor Yellow
    Write-Host "1. Open PowerPoint manually" -ForegroundColor White
    Write-Host "2. Create new presentation (16:9 format)" -ForegroundColor White
    Write-Host "3. Follow the instructions in the .md files" -ForegroundColor White
}

Write-Host ""
Write-Host "Template creation process complete!" -ForegroundColor Magenta