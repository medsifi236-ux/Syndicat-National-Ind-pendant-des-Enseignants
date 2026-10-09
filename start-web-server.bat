@echo off
title SNIDE.INFO Website Server
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
