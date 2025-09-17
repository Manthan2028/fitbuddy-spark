# System Architecture Diagram Template Creator
# PowerShell script to automate PowerPoint template creation

param(
    [string]$TemplateName = "System_Architecture_Template",
    [switch]$OpenPowerPoint = $true,
    [switch]$CreateSample = $true
)

Write-Host "🏗️  Creating System Architecture Diagram Template..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Yellow

# Define paths
$DocumentsPath = [Environment]::GetFolderPath("MyDocuments")
$WarpPath = Join-Path $DocumentsPath "Warp"
$TemplatePath = Join-Path $WarpPath "$TemplateName.pptx"

# Create Warp directory if it doesn't exist
if (-not (Test-Path $WarpPath)) {
    New-Item -Path $WarpPath -ItemType Directory -Force | Out-Null
    Write-Host "✅ Created Warp directory: $WarpPath" -ForegroundColor Green
}

# Function to create PowerPoint application
function New-PowerPointTemplate {
    param([string]$FilePath)
    
    try {
        Write-Host "🎯 Starting PowerPoint application..." -ForegroundColor Blue
        
        # Create PowerPoint application object
        $PowerPoint = New-Object -ComObject PowerPoint.Application
        $PowerPoint.Visible = $true
        
        # Create new presentation
        $Presentation = $PowerPoint.Presentations.Add()
        
        # Set slide size to 16:9
        $Presentation.PageSetup.SlideSize = 7  # ppSlideSizeOnScreen16x9
        
        Write-Host "✅ Created new PowerPoint presentation" -ForegroundColor Green
        
        # Remove default slide and add custom slides
        $Presentation.Slides.Item(1).Delete()
        
        # Add title slide
        $TitleSlide = $Presentation.Slides.Add(1, 11) # ppLayoutTitleOnly
        $TitleSlide.Shapes.Title.TextFrame.TextRange.Text = "System Architecture Diagram"
        
        # Add subtitle
        $SubtitleShape = $TitleSlide.Shapes.AddTextbox(1, 100, 200, 800, 100) # msoTextOrientationHorizontal
        $SubtitleShape.TextFrame.TextRange.Text = "Modern Web Application Architecture`nCreated with PowerPoint Template"
        $SubtitleShape.TextFrame.TextRange.Font.Size = 18
        $SubtitleShape.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::FromArgb(96, 94, 92).ToArgb()
        
        # Add main diagram slide
        $DiagramSlide = $Presentation.Slides.Add(2, 12) # ppLayoutBlank
        
        # Add slide title
        $TitleShape = $DiagramSlide.Shapes.AddTextbox(1, 50, 20, 800, 50)
        $TitleShape.TextFrame.TextRange.Text = "System Architecture Overview"
        $TitleShape.TextFrame.TextRange.Font.Size = 32
        $TitleShape.TextFrame.TextRange.Font.Bold = $true
        $TitleShape.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::FromArgb(0, 120, 212).ToArgb()
        
        Write-Host "✅ Added title and diagram slides" -ForegroundColor Green
        
        # Save the presentation
        $Presentation.SaveAs($FilePath)
        Write-Host "✅ Saved template to: $FilePath" -ForegroundColor Green
        
        return $PowerPoint
        
    } catch {
        Write-Host "❌ Error creating PowerPoint template: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Function to add sample components
function Add-SampleComponents {
    param($PowerPoint)
    
    if (-not $PowerPoint) {
        Write-Host "❌ PowerPoint application not available" -ForegroundColor Red
        return
    }
    
    try {
        Write-Host "🎨 Adding sample architecture components..." -ForegroundColor Blue
        
        $Presentation = $PowerPoint.ActivePresentation
        $DiagramSlide = $Presentation.Slides.Item(2)
        
        # Define colors
        $BlueColor = [System.Drawing.Color]::FromArgb(0, 120, 212).ToArgb()
        $GreenColor = [System.Drawing.Color]::FromArgb(16, 124, 16).ToArgb()
        $OrangeColor = [System.Drawing.Color]::FromArgb(255, 140, 0).ToArgb()
        $PurpleColor = [System.Drawing.Color]::FromArgb(92, 45, 145).ToArgb()
        
        # Add frontend layer background
        $FrontendBg = $DiagramSlide.Shapes.AddShape(1, 100, 100, 600, 120) # msoShapeRectangle
        $FrontendBg.Fill.ForeColor.RGB = [System.Drawing.Color]::FromArgb(243, 242, 241).ToArgb()
        $FrontendBg.Line.Visible = $false
        
        # Add frontend components
        $WebBrowser = $DiagramSlide.Shapes.AddShape(1, 120, 130, 100, 60)
        $WebBrowser.Fill.ForeColor.RGB = $BlueColor
        $WebBrowser.TextFrame.TextRange.Text = "Web Browser"
        $WebBrowser.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $WebBrowser.TextFrame.TextRange.Font.Size = 12
        
        $MobileApp = $DiagramSlide.Shapes.AddShape(1, 240, 130, 100, 60)
        $MobileApp.Fill.ForeColor.RGB = $BlueColor
        $MobileApp.TextFrame.TextRange.Text = "Mobile App"
        $MobileApp.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $MobileApp.TextFrame.TextRange.Font.Size = 12
        
        # Add load balancer
        $LoadBalancer = $DiagramSlide.Shapes.AddShape(1, 300, 250, 120, 60)
        $LoadBalancer.Fill.ForeColor.RGB = $OrangeColor
        $LoadBalancer.TextFrame.TextRange.Text = "Load Balancer"
        $LoadBalancer.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $LoadBalancer.TextFrame.TextRange.Font.Size = 12
        
        # Add application servers
        $AppServer1 = $DiagramSlide.Shapes.AddShape(1, 200, 350, 100, 80)
        $AppServer1.Fill.ForeColor.RGB = $BlueColor
        $AppServer1.TextFrame.TextRange.Text = "App Server 1"
        $AppServer1.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $AppServer1.TextFrame.TextRange.Font.Size = 11
        
        $AppServer2 = $DiagramSlide.Shapes.AddShape(1, 320, 350, 100, 80)
        $AppServer2.Fill.ForeColor.RGB = $BlueColor
        $AppServer2.TextFrame.TextRange.Text = "App Server 2"
        $AppServer2.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $AppServer2.TextFrame.TextRange.Font.Size = 11
        
        # Add database
        $Database = $DiagramSlide.Shapes.AddShape(1, 250, 470, 120, 80)
        $Database.Fill.ForeColor.RGB = $GreenColor
        $Database.TextFrame.TextRange.Text = "Primary Database"
        $Database.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $Database.TextFrame.TextRange.Font.Size = 11
        
        # Add cache
        $Cache = $DiagramSlide.Shapes.AddShape(1, 390, 470, 100, 80)
        $Cache.Fill.ForeColor.RGB = $GreenColor
        $Cache.TextFrame.TextRange.Text = "Redis Cache"
        $Cache.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $Cache.TextFrame.TextRange.Font.Size = 11
        
        # Add external services
        $PaymentGateway = $DiagramSlide.Shapes.AddShape(1, 550, 300, 120, 60)
        $PaymentGateway.Fill.ForeColor.RGB = $OrangeColor
        $PaymentGateway.TextFrame.TextRange.Text = "Payment Gateway"
        $PaymentGateway.TextFrame.TextRange.Font.Color.RGB = [System.Drawing.Color]::White.ToArgb()
        $PaymentGateway.TextFrame.TextRange.Font.Size = 10
        
        Write-Host "✅ Added sample architecture components" -ForegroundColor Green
        
        # Add arrows (simplified)
        Write-Host "🔗 Adding connection arrows..." -ForegroundColor Blue
        
        # Web Browser to Load Balancer arrow
        $Arrow1 = $DiagramSlide.Shapes.AddConnector(2, 0, 0, 0, 0) # msoConnectorStraight
        $Arrow1.ConnectorFormat.BeginConnect($WebBrowser, 3) # Bottom connection point
        $Arrow1.ConnectorFormat.EndConnect($LoadBalancer, 1)   # Top connection point
        $Arrow1.Line.ForeColor.RGB = $BlueColor
        $Arrow1.Line.Weight = 2
        $Arrow1.Line.EndArrowheadStyle = 3 # msoArrowheadTriangle
        
        Write-Host "✅ Added connection arrows" -ForegroundColor Green
        
    } catch {
        Write-Host "⚠️  Warning: Could not add all sample components: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Function to create instruction slide
function Add-InstructionSlide {
    param($PowerPoint)
    
    if (-not $PowerPoint) { return }
    
    try {
        $Presentation = $PowerPoint.ActivePresentation
        $InstructionSlide = $Presentation.Slides.Add(3, 12) # ppLayoutBlank
        
        # Add title
        $TitleShape = $InstructionSlide.Shapes.AddTextbox(1, 50, 20, 800, 50)
        $TitleShape.TextFrame.TextRange.Text = "How to Use This Template"
        $TitleShape.TextFrame.TextRange.Font.Size = 28
        $TitleShape.TextFrame.TextRange.Font.Bold = $true
        
        # Add instructions
        $InstructionsText = @"
Quick Start Guide:

1. ICONS AND SHAPES
   - Insert -> Icons -> Search 'server', 'database', 'cloud', 'mobile'
   - Insert -> Shapes -> Use rectangles and arrows
   - Apply consistent colors using Format Painter

2. COLOR SCHEME
   - Blue (#0078D4): Application components
   - Green (#107C10): Data storage
   - Orange (#FF8C00): External services
   - Purple (#5C2D91): Infrastructure

3. WORKFLOW ARROWS
   - Insert -> Shapes -> Block Arrows or Connectors
   - Right-click arrows -> Format Shape -> Line -> Add arrowheads
   - Use different line styles: Solid (sync), Dashed (async)

4. BEST PRACTICES
   - Keep components aligned using Format -> Align
   - Use consistent sizing (suggested: 120x80 for standard components)
   - Group related components together
   - Add labels and legends for clarity

Template Files:
   - Instructions: System_Architecture_Template_Instructions.md
   - Component Specs: Architecture_Components_Spec.json
"@
        
        $InstructionsShape = $InstructionSlide.Shapes.AddTextbox(1, 80, 100, 760, 500)
        $InstructionsShape.TextFrame.TextRange.Text = $InstructionsText
        $InstructionsShape.TextFrame.TextRange.Font.Size = 14
        $InstructionsShape.TextFrame.TextRange.Font.Name = "Segoe UI"
        
        Write-Host "✅ Added instruction slide" -ForegroundColor Green
        
    } catch {
        Write-Host "⚠️  Could not add instruction slide: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Main execution
Write-Host "🚀 Starting template creation process..." -ForegroundColor Magenta

# Check if PowerPoint is available
try {
    $null = New-Object -ComObject PowerPoint.Application -ErrorAction Stop
    Write-Host "✅ PowerPoint is available on this system" -ForegroundColor Green
} catch {
    Write-Host "❌ PowerPoint is not available. Please install Microsoft PowerPoint." -ForegroundColor Red
    Write-Host "📖 You can still use the template files manually:" -ForegroundColor Yellow
    Write-Host "   - System_Architecture_Template_Instructions.md" -ForegroundColor White
    Write-Host "   - Architecture_Components_Spec.json" -ForegroundColor White
    exit 1
}

# Create the PowerPoint template
if ($OpenPowerPoint) {
    $PowerPointApp = New-PowerPointTemplate -FilePath $TemplatePath
    
    if ($PowerPointApp -and $CreateSample) {
        Add-SampleComponents -PowerPoint $PowerPointApp
        Add-InstructionSlide -PowerPoint $PowerPointApp
        
        # Save the final template
        try {
            $PowerPointApp.ActivePresentation.Save()
            Write-Host "💾 Template saved successfully!" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  Warning: Could not save template automatically" -ForegroundColor Yellow
        }
    }
    
    Write-Host "`n🎉 Template created successfully!" -ForegroundColor Green
    Write-Host "📂 Location: $TemplatePath" -ForegroundColor Cyan
    Write-Host "📖 Instructions: $WarpPath\System_Architecture_Template_Instructions.md" -ForegroundColor Cyan
    Write-Host "`n💡 Next Steps:" -ForegroundColor Yellow
    Write-Host "   1. Customize the sample components" -ForegroundColor White
    Write-Host "   2. Add your specific architecture elements" -ForegroundColor White
    Write-Host "   3. Connect components with arrows" -ForegroundColor White
    Write-Host "   4. Add labels and legends" -ForegroundColor White
    
} else {
    Write-Host "📄 Template files created. Manual PowerPoint setup required." -ForegroundColor Blue
}

Write-Host "`n✨ Template creation complete!" -ForegroundColor Magenta