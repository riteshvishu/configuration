@echo off
setlocal

rem change this directory path to match where coreutils is installed.
set CoreUtils=c:\cygwin

set path=%CoreUtils%\bin;%path%

set suffix=%RANDOM%

rem usage:  scriptname -T tempDir

if "%1" == "-T" (
  set tempDir=%2
) else (
  echo !Error: Please specify temporary directory.
  echo usage: scriptname -T tempDir
  echo Exiting.& exit /b 1
)

set infile=%tempDir%\policy-uniquify-in%suffix%
set awkfile=%tempDir%\policy-awk%suffix%
set tempfile=%tempDir%\policy-uniquify%suffix%
set outfile=%tempDir%\policy-uniquify-done%suffix%
set startfile=%tempDir%\policy-start%suffix%
set endfile=%tempDir%\policy-end%suffix%

rem put standard input into a temporary file
cat > %infile%

rem NOTE: if XML output changes (e.g. because query is modified) these columns may change
set urnField=7,8
set sliceDateField=5,6r
set termNumberField=9,10rn

gawk '/?xml/ {next;} /.*CONTAINER_ELEM/ {next;} {print;}' %infile% > %awkfile%

rem sort input : policy-uniquify-in output : policy-uniquify
sort -T %tempDir% --stable --key=%urnField% --key=%sliceDateField% --key=%termNumberField% "--field-separator=>" %awkfile% > %tempfile%

rem uniquify input : policy-uniquify output : policy-uniquify-done
sort -T %tempDir% --unique --key=%urnField% "--field-separator=>" %tempfile% > %outfile%

rem combine two files together
cat postprocess-start.txt %outfile% postprocess-end.txt

rm -f %infile% %awkfile% %tempfile% %outfile% %startfile% %endfile%

