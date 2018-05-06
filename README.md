
### Data sources
https://developer.marvel.com/docs
---

https://en.wikipedia.org/wiki/List_of_Marvel_Comics_superhero_debuts
---

### Local folder (git)
cd /Volumes/Transcend/JES/PROJECTS/MarvelApp/moapp_expo
---
### Local folder (development)
cd $HOME/kaka/moapp

### CLEAR CACHE AND CORRUPT
```
watchman watch-del-all
npm start -- --reset-cache
rm -rf $TMPDIR/react-*
rm -fr $TMPDIR/metro*
```
---

https://github.com/facebook/react-native/issues/4968
---

### Para abrir el developer menu en el android simulator:
```
Cmd + M
```
---

### Para abrir el developer menu en el android device:
```
adb reverse tcp:8081 tcp:8081
adb shell input keyevent 82
```
y activar el LiveReload para que los cambios en el código se refresquen automáticamente
---

### ANDROID EMULATOR CLEAR CACHE

```
cd ~/.android/avd/*.avd y borra todos los *.img (es como resetar el device de fabrica)
```

### IOS SIMULATOR from command line

```
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/Contents/MacOS/Simulator
```

### List android devices for launch on development
```
adb devices
```
