# Generate SRI (SHA384) for one or more CDN URLs and patch index.html placeholders
# Usage:
#   .\generate_sri_and_patch.ps1 -Entries @(
#      @{ url = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'; placeholder = 'sha384-PLACEHOLDER-BOOTSTRAP' },
#      @{ url = 'https://use.fontawesome.com/releases/v6.3.0/js/all.js'; placeholder = 'sha384-PLACEHOLDER-FONT-AWESOME' }
#   )

param(
    [Parameter(Mandatory=$true)]
    [Array] $Entries,
    [string] $IndexPath = 'index.html'
)

function Compute-Sri([string]$filePath){
    $hash = Get-FileHash -Path $filePath -Algorithm SHA384
    $hashBytes = [System.Convert]::FromHexString($hash.Hash)
    $base64 = [System.Convert]::ToBase64String($hashBytes)
    return "sha384-$base64"
}

foreach($entry in $Entries){
    $url = $entry.url
    $placeholder = $entry.placeholder

    Write-Host "Processing: $url"
    $tmp = [System.IO.Path]::GetTempFileName()
    try{
        Invoke-WebRequest -Uri $url -OutFile $tmp -UseBasicParsing -ErrorAction Stop
        $sri = Compute-Sri $tmp
        Write-Host "Computed SRI: $sri"
        # Read index.html
        $index = Get-Content -Path $IndexPath -Raw
        if($index -match [regex]::Escape($placeholder)){
            $newIndex = $index -replace [regex]::Escape($placeholder), $sri
            # Backup index
            Copy-Item -Path $IndexPath -Destination "$IndexPath.bak_$(Get-Date -Format 'yyyyMMddHHmmss')"
            Set-Content -Path $IndexPath -Value $newIndex -Force
            Write-Host "Patched $IndexPath: replaced $placeholder with $sri"
        } else {
            Write-Host "Placeholder $placeholder not found in $IndexPath"
        }
    } catch {
        Write-Host "Failed to download or compute SRI for $url: $_" -ForegroundColor Red
    } finally {
        Remove-Item -Path $tmp -ErrorAction SilentlyContinue
    }
}

Write-Host "Done. Please verify index.html and commit the changes to your repository."
