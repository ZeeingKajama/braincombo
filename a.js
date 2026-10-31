// 동물 페이지 — 프레임워크 없음 (docs/animal_link.md §7.3). 문구는 §9.2.
(function () {
  var PKG = "com.zeeing.braingame";
  var HOST = "zeeingkajama.github.io";
  var BASE = "/braincombo";
  var PLAY = "https://play.google.com/store/apps/details?id=" + PKG;
  var T = {
    ko: { title: "친구의 두뇌 동물", line: "친구가 두뇌 동물 테스트 결과를 보냈어요. 너는 어떤 동물일까?", none: "너는 어떤 두뇌 동물일까?", open: "앱에서 테스트하기", install: "앱 설치하기", notAndroid: "Android 앱이에요. Android 휴대폰에서 열어 주세요", word: "브레인 콤보", stop: ". " },
    en: { title: "A friend's brain animal", line: "A friend sent you their Brain Animal Test result. Which one are you?", none: "Which brain animal are you?", open: "Take the test in the app", install: "Get the app", notAndroid: "Brain Combo is an Android app. Open this on an Android phone", word: "Brain Combo", stop: ". " },
    ja: { title: "友だちの脳どうぶつ", line: "友だちから脳どうぶつテストの結果が届きました。あなたは何タイプ？", none: "あなたは何タイプ？", open: "アプリでテストする", install: "アプリを入手", notAndroid: "Android 向けのアプリです。Android のスマートフォンで開いてください", word: "Brain Combo", stop: "。" }
  };
  var m = location.pathname.match(/\/(ko|en|ja)\/a\//);
  var page = m ? m[1] : "ko";
  var nav = (navigator.language || "").slice(0, 2).toLowerCase();
  var lang = T[nav] ? nav : page;
  var t = T[lang];
  var am = location.search.match(/(?:^\?|&)a=([a-z_]{3,32})(?:&|$)/);
  var animal = am ? am[1] : "";
  var android = /Android/i.test(navigator.userAgent);

  function $(id) { return document.getElementById(id); }

  document.documentElement.lang = lang;
  $("word").textContent = t.word;
  $("title").textContent = t.title;
  $("install").textContent = t.install;
  $("open").textContent = t.open;

  var line = animal ? t.line : t.none;
  // 한 줄이 이미 ?·。로 끝나면 마침표를 겹치지 않는다.
  if (!android) { line += (/[?？。]$/.test(line) ? (lang === "ja" ? "" : " ") : t.stop) + t.notAndroid; }
  $("line").textContent = line;

  // 앱이 없어 넘어가는 Play 도 [앱 설치하기]와 같은 주소 — 설치 뒤 첫 실행에 동물이 기다린다(리퍼러).
  var install = animal ? PLAY + "&referrer=" + encodeURIComponent("a=" + animal) : PLAY;
  $("install").href = install;
  $("open").hidden = !android;
  $("open").href = "intent://" + HOST + BASE + "/" + page + "/a/" + (animal ? "?a=" + animal : "") +
    "#Intent;scheme=https;package=" + PKG + ";S.browser_fallback_url=" + encodeURIComponent(install) + ";end";
  $("install").classList.toggle("main", !android);
}());
