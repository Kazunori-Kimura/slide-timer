
mkdir dist\style
xcopy bower_components\Honoka\dist dist\style\ /Y /S /C /I /R
mkdir dist\pdfjs-dist
xcopy node_modules\pdf.js-controller\node_modules\pdfjs-dist dist\pdfjs-dist\ /Y /S /C /I /R
xcopy src\wwwroot dist /Y /S /C /I /R
