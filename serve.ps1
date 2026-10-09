$projectDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDirectory
$securePassword = Read-Host "Set the SNIDE admin password (minimum 12 characters)" -AsSecureString
$passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)

try {
  $env:HOST = "127.0.0.1"
  $env:SNIDE_ADMIN_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
  node .\server.js
}
finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
  Remove-Item Env:HOST -ErrorAction SilentlyContinue
  Remove-Item Env:SNIDE_ADMIN_PASSWORD -ErrorAction SilentlyContinue
  $securePassword.Dispose()
}
