(function (w) {
    document.addEventListener('plusready', function () {
      console.log("Immersed-UserAgent: " + navigator.userAgent);
    }, false);

    var immersed = 0;
    var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if (ms && ms.length >= 3) {
      immersed = parseFloat(ms[2]);
    }
    w.immersed = immersed;

    if (!immersed) {
      return;
    }
    var t = document.getElementsByClassName('headerNavFixed');
    var c = document.getElementsByClassName('contentNavFixed')
    // t&&(t.style.paddingTop=immersed+'px',t.style.background='-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))',t.style.color='#FFF');
    for (var i = 0; i < t.length; i++) {
      t[i] && (t[i].style.paddingTop = immersed + 'px', t[i].style.background = '#be2c1f', t[i].style.color = '#FFF');
      c[i] && (c[i].style.paddingTop = immersed + 44 + 'px', t[i].style.background = '#be2c1f', t[i].style.color = '#FFF') ;
    }
  })(window);