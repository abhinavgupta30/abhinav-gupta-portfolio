
(function () {
    // The original markup has an unclosed <div>, so re-parent our UI directly under <body>
    ['top-tools', 'midnight-veil', 'ag-toast', 'recruiter-view'].forEach(function (id) { var n = document.getElementById(id); if (n && n.parentNode !== document.body) document.body.appendChild(n); });
    var KEY = 'recruiterMode', html = document.documentElement;
    function downloadResume() {
        var a = document.createElement('a');
        a.href = '/assets/Abhinav_Gupta_Resume.pdf';
        a.download = 'Abhinav_Gupta_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast('Resume downloading…');
    }
    var EMAIL = 'abhiguptaa41@gmail.com';
    var LINES = [
        'Builds better at midnight.', 'Creative by night. Even more creative at midnight.', 'Best ideas arrive after 12:00 AM.',
        'Caution: may keep shipping after 11 PM.', "git commit -m 'works at 12:47 AM, don't ask why'",
        'Sleep.exe has stopped responding.', 'Works on my machine. Especially at midnight.'
    ];
    function store(v) { try { if (v === undefined) return localStorage.getItem(KEY) === '1'; v ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY); } catch (e) { return false; } }
    function isOn() { return html.classList.contains('recruiter'); }
    var toastEl = document.getElementById('ag-toast'), toastT;
    function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2200); }

    function toggleRecruiter() {
        store(!isOn());
        var u = new URL(location.href); u.searchParams.delete('recruiter'); location.href = u.toString();
    }
    var rBtn = document.getElementById('btn-recruiter');
    function syncBtn() { if (!rBtn) return; var on = isOn(); rBtn.setAttribute('aria-pressed', String(on)); rBtn.textContent = on ? 'Exit recruiter mode' : 'Recruiter mode'; }
    syncBtn();
    if (rBtn) rBtn.addEventListener('click', toggleRecruiter);
    var rvExit = document.getElementById('rv-exit'); if (rvExit) rvExit.addEventListener('click', toggleRecruiter);
    var rvCopy = document.getElementById('rv-copy'); if (rvCopy) rvCopy.addEventListener('click', copyEmail);
    function copyEmail() { try { navigator.clipboard.writeText(EMAIL).then(function () { toast('Email copied \u2713'); }, function () { toast(EMAIL); }); } catch (e) { toast(EMAIL); } }

    ['btn-resume', 'rv-resume', 'contact-resume'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', function (e) { e.preventDefault(); downloadResume(); });
    });

    // Calm the heavy site while recruiter view covers it
    window.addEventListener('load', function () {
        if (!isOn()) return;
        try { var tg = sessionStorage.getItem('rvTarget'); if (tg) { sessionStorage.removeItem('rvTarget'); setTimeout(function () { var t = document.getElementById(tg); var v = document.getElementById('recruiter-view'); if (t && v) { v.style.scrollBehavior = 'auto'; t.scrollIntoView({ block: 'start' }); v.style.scrollBehavior = ''; } }, 200); } } catch (e) {}
        try { if (typeof gsap !== 'undefined') gsap.ticker.fps(12); } catch (e) {}
        try { if (typeof lenis !== 'undefined' && lenis.stop) lenis.stop(); } catch (e) {}
    });

    // ----- command palette -----
    var isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
    var kbd = document.getElementById('kbd-label'); if (kbd) kbd.textContent = isMac ? '\u2318K' : 'Ctrl K';
    var pb = document.getElementById('btn-palette'); if (pb) pb.setAttribute('aria-label', 'Open command palette (' + (isMac ? 'Command K' : 'Control K') + ')');

    function go(secId, rvId) {
        if (isOn()) { var t = document.getElementById(rvId); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        var a = document.querySelector('a.nav-link-route[href="#' + secId + '"]');
        if (a) { a.click(); return; }
        var el = document.getElementById(secId); if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    // Skills, research and experience live in the recruiter view, so from the normal site we open that view at the right spot
    function goRv(rvId) {
        if (isOn()) { var t = document.getElementById(rvId); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        try { sessionStorage.setItem('rvTarget', rvId); } catch (e) {}
        store(true);
        var u = new URL(location.href); u.searchParams.delete('recruiter'); location.href = u.toString();
    }
    var rvTag = isOn() ? 'section' : 'recruiter view';
    var items = [
        ['Skills', rvTag, function () { goRv('rv-skills'); }],
        ['Projects', 'section', function () { go('experience', 'rv-projects'); }],
        ['Research Papers', rvTag, function () { goRv('rv-research'); }],
        ['Experience', rvTag, function () { goRv('rv-experience'); }],
        ['Home', 'section', function () { go('hero', 'rv-summary'); }],
        ['Origin (About)', 'section', function () { go('about', 'rv-summary'); }],
        ['Best Work (metro)', 'section', function () { go('vending', 'rv-projects'); }],
        ['Midnight Work', 'section', function () { go('gallery', 'rv-skills'); }],
        ['Contact', 'section', function () { go('contact', 'rv-contact'); }],
        ['Send email', 'action', function () { location.href = 'mailto:' + EMAIL + '?subject=Opportunity%20for%20Abhinav%20Gupta'; }],
        ['Copy email', 'action', copyEmail],
        ['Open LinkedIn', 'action', openUrl('https://www.linkedin.com/in/abhinav-gupta-382355376/')],
        ['Open GitHub', 'action', openUrl('https://github.com/abhinavgupta30')],
        ['Download resume', 'action', downloadResume],
        [isOn() ? 'Exit recruiter mode' : 'Turn on recruiter mode', 'action', toggleRecruiter],
        ['Make it midnight', 'fun', function () { var on = html.classList.toggle('midnight-extra'); toast(on ? "It's 12:00 AM. Peak performance unlocked." : 'Back to daylight.'); }],
        ['Show a midnight quote', 'fun', function () { toast(LINES[Math.floor(Math.random() * LINES.length)]); }]
    ];
    function openUrl(u) { return function () { window.open(u, '_blank', 'noopener'); }; }

    var wrap = document.createElement('div');
    wrap.id = 'palette'; wrap.hidden = true;
    wrap.innerHTML = '<div class="pal-box" role="dialog" aria-modal="true" aria-label="Command palette"><input id="pal-in" type="text" role="combobox" aria-expanded="true" aria-controls="pal-list" autocomplete="off" spellcheck="false" placeholder="Type to search: projects, skills, actions\u2026" aria-label="Search commands"><ul id="pal-list" role="listbox"></ul><div class="pal-hint">\u2191\u2193 navigate &middot; Enter run &middot; Esc close</div></div>';
    document.body.appendChild(wrap);
    var input = wrap.querySelector('#pal-in'), list = wrap.querySelector('#pal-list');
    var shown = [], sel = 0, lastFocus = null;
    function render() {
        var q = input.value.trim().toLowerCase();
        shown = items.filter(function (it) { return !q || (it[0] + ' ' + it[1]).toLowerCase().indexOf(q) > -1; });
        sel = Math.min(sel, Math.max(shown.length - 1, 0));
        list.innerHTML = shown.map(function (it, i) { return '<li role="option" aria-selected="' + (i === sel) + '" class="' + (i === sel ? 'sel' : '') + '" data-i="' + i + '"><span>' + it[0] + '</span><em>' + it[1] + '</em></li>'; }).join('') || '<li><span>No match. Try &ldquo;project&rdquo; or &ldquo;email&rdquo;.</span></li>';
        var s = list.querySelector('.sel'); if (s && s.scrollIntoView) s.scrollIntoView({ block: 'nearest' });
    }
    function open() { lastFocus = document.activeElement; wrap.hidden = false; input.value = ''; sel = 0; render(); setTimeout(function () { input.focus(); }, 10); }
    function close() { wrap.hidden = true; if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} } }
    function run(i) { var it = shown[i]; if (!it) return; close(); setTimeout(it[2], 60); }
    list.addEventListener('click', function (e) { var li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
    wrap.addEventListener('mousedown', function (e) { if (e.target === wrap) close(); });
    input.addEventListener('input', function () { sel = 0; render(); });
    input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); render(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
        else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
        else if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'Tab') { e.preventDefault(); }
    });
    if (pb) pb.addEventListener('click', open);
    window.addEventListener('keydown', function (e) {
        var k = (e.key || '').toLowerCase();
        if ((e.ctrlKey || e.metaKey) && k === 'k') { e.preventDefault(); wrap.hidden ? open() : close(); return; }
        if (k === 'escape' && !wrap.hidden) { close(); return; }
        var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
        if (k === 'r' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey && wrap.hidden) { toggleRecruiter(); }
    });
})();
