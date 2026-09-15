(function () {
  "use strict";

  // Shared faces and outfits keep P and E recognisable in every episode.
  function person(x, y, who, pose = "walk", scale = 1.5) {
    const isP = who === "p";
    const skin = isP ? "#c58c68" : "#f1c7ae";
    const hair = isP ? "#39312f" : "#c49053";
    const shirt = isP ? "#527c6c" : "#bf7e92";
    const eyes = pose === "laugh"
      ? '<path d="M-15-113q5-6 10 0m10 0q5-6 10 0" fill="none"/>'
      : '<g class="couple-eyes"><circle cx="-10" cy="-113" r="2"/><circle cx="10" cy="-113" r="2"/></g>';
    const arms = pose === "meet"
      ? '<g class="hello-arm"><path d="M-20-76Q-46-95-41-126"/></g><path d="M20-76Q40-66 37-47"/>'
      : pose === "dine"
        ? '<path d="M-20-76q-24 22-15 39"/><g class="dining-arm"><path d="M20-76q30 11 15-17"/><path d="M35-94l8-13" stroke="#9b9990" stroke-width="3"/><ellipse cx="46" cy="-111" rx="4" ry="7" fill="#c9c7b8" stroke="#9b9990" stroke-width="1.5" transform="rotate(30 46 -111)"/></g>'
        : pose === "run"
          ? '<path class="runner-arm arm-left" d="M-20-76q-22 3-32 23l-17-9"/><path class="runner-arm arm-right" d="M20-76q19 7 27 25l16 5"/>'
          : '<path d="M-20-76q-17 11-20 33M20-76q17 11 20 33"/>';
    const lowerBody = pose === "run"
      ? '<g class="run-leg run-leg-left" fill="none"><path d="M-12-30-31-8" stroke="#4b5559" stroke-width="12"/><path d="M-31-7h-14" stroke="#463e39" stroke-width="8"/></g><g class="run-leg run-leg-right" fill="none"><path d="M12-30 29-12" stroke="#4b5559" stroke-width="12"/><path d="M29-11h14" stroke="#463e39" stroke-width="8"/></g>'
      : '<g stroke="#4b5559" stroke-width="12" fill="none"><path class="couple-leg leg-left" d="M-12-30-16-5"/><path class="couple-leg leg-right" d="M12-30 16-5"/></g><g stroke="#463e39" stroke-width="8"><path d="M-17-3h-10m43 0h10"/></g>';
    return `<g transform="translate(${x} ${y}) scale(${scale})"><g class="couple-person person-${who} pose-${pose}">
      ${!isP ? `<path d="M-28-110q-7-43 28-43t28 43l5 47q-20 12-34-5-16 15-33 4Z" fill="${hair}"/>` : ""}
      ${pose === "hike" ? '<rect x="-35" y="-83" width="28" height="51" rx="11" fill="#d8a75b"/><path d="M-29-78v32" stroke="#b88645"/>' : ""}
      ${lowerBody}
      <path d="M-21-83q21-10 42 0l5 57h-52Z" fill="${shirt}"/>
      ${isP ? '<path d="M-11-81q11 14 22 0M-9-66v17m18-17v17" fill="none" stroke="#a3b6a3" stroke-width="2"/>' : '<path d="M-11-84q11 12 22 0" fill="none" stroke="#e8afbd" stroke-width="3"/>'}
      <g stroke="${skin}" stroke-width="10" fill="none">${arms}</g>
      <path d="M-7-93v11q7 6 14 0v-11" fill="${skin}"/>
      <g class="couple-head">
        <circle cy="-116" r="27" fill="${skin}"/>
        ${isP
          ? `<path d="M-27-117q-10-35 20-37 28-6 34 25l-7 11-3-18q-19 11-37 2l-2 17Z" fill="${hair}"/><path d="M-22-109q2 28 22 27 22 0 24-28l-8 12q-16-7-30 0Z" fill="${hair}"/>`
          : `<path d="M-26-115q-4-34 26-34 29 0 27 32-11-5-18-20-14 17-35 22Z" fill="${hair}"/><path class="flowing-hair" d="M23-129q18 45 5 66l-12-10q10-27 1-43" fill="${hair}"/>`}
        <g stroke="#463a35" stroke-width="2.2">${eyes}</g>
        ${isP ? '<g fill="none" stroke="#485452" stroke-width="2"><rect x="-21" y="-121" width="18" height="14" rx="5"/><rect x="3" y="-121" width="18" height="14" rx="5"/><path d="M-3-116h6"/></g>' : '<g fill="#e8a3a0" opacity=".55"><ellipse cx="-17" cy="-104" rx="5" ry="3"/><ellipse cx="17" cy="-104" rx="5" ry="3"/></g>'}
        ${pose === "laugh" ? '<path d="M-10-101q10 18 20 0Z" fill="#75483e"/><path d="M-7-100H7" stroke="#fffaf4" stroke-width="3"/>' : '<path d="M-8-101q8 8 16 0" fill="none" stroke="#fff2df" stroke-width="2.8"/>'}
      </g>
    </g></g>`;
  }

  function pumpkin(x, y, size = 1) {
    return `<g transform="translate(${x} ${y}) scale(${size})"><path d="M0-21q-4-16 9-19" fill="none" stroke="#7a8851" stroke-width="6"/><ellipse rx="30" ry="23" fill="#d88542"/><ellipse rx="20" ry="23" fill="#eda052"/><ellipse rx="9" ry="23" fill="#f5b05d"/><path d="M-14-19q-10 19 0 38m28-38q10 19 0 38" fill="none" stroke="#c77738" opacity=".6"/></g>`;
  }

  function cloud(x, y, scale = 1) {
    return `<g transform="translate(${x} ${y}) scale(${scale})"><path class="drifting-cloud" d="M-42 12q-7-21 15-23 7-30 32-14 25-10 29 14 24 2 18 23Z" fill="#fffaf1" opacity=".8"/></g>`;
  }

  function heart(x, y, size = 1) {
    return `<g transform="translate(${x} ${y}) scale(${size})"><path class="floating-heart" d="M0 7C-27-9-12-25 0-13 12-25 27-9 0 7Z" fill="#d98388" stroke="none"/></g>`;
  }

  function umbrella(x, y, size = 1) {
    return `<g transform="translate(${x} ${y}) scale(${size})"><g class="yellow-umbrella"><path d="M-42 0Q0-64 42 0q-14-10-28 0-14-10-28 0-14-10-28 0Z" fill="#eec34b" stroke="#b8933e" stroke-width="2"/><path d="M0 0v47q0 14 13 10" fill="none" stroke="#9b7951" stroke-width="3"/><path d="M0-32Q-14-20-14 0m14-32q14 12 14 32" fill="none" stroke="#d7ab3d" stroke-width="2"/></g></g>`;
  }

  const scenes = {
    pumpkin: `<rect width="760" height="400" fill="#f8e8cf"/>
      <circle class="morning-sun" cx="585" cy="85" r="43" fill="#ecc275"/>
      ${cloud(156, 75, 1.2)}${cloud(457, 53, .7)}
      <path d="M0 214q165-101 354-30 211-67 406 1v215H0Z" fill="#c6cb9c"/>
      <path d="M0 275q230-70 399-13 190-59 361-6v144H0Z" fill="#aeb98a"/>
      <g stroke="#a8946a" stroke-width="4"><path d="M30 223h700M30 240h700M50 204v58m85-58v58m85-58v58m85-58v58m85-58v58m85-58v58m85-58v58m85-58v58"/></g>
      ${pumpkin(90, 290, .9)}${pumpkin(181, 250, .6)}${pumpkin(604, 274, .8)}${pumpkin(699, 311, 1.1)}
      <ellipse cx="381" cy="328" rx="160" ry="22" fill="#89976b" opacity=".3"/>
      <path d="M234 400q54-63 149-73t99-73" fill="none" stroke="#d8c099" stroke-width="42"/>
      ${person(317, 314, "p", "meet")}${person(444, 314, "e", "meet")}
      ${pumpkin(146, 357, 1.35)}${pumpkin(597, 350, 1.2)}${pumpkin(653, 370, .8)}${heart(380, 92, .65)}
      <g class="hello-caption" fill="#87795e" font-family="Georgia, serif" font-size="18" font-style="italic"><text x="263" y="69">hello, you.</text></g>`,

    thai: `<rect width="760" height="400" fill="#f4dfce"/>
      <rect x="50" y="37" width="204" height="183" rx="62" fill="#c6d2c7"/>
      <path d="M152 38v180M52 137h201" stroke="#ffefdc" stroke-width="9"/>
      <circle cx="193" cy="81" r="24" fill="#f1d08a"/>
      <path d="M0 300h760v100H0Z" fill="#dfb99b"/>
      <g stroke="#caa289" stroke-width="2"><path d="M0 340h760M0 382h760M100 300v40m178 0v42m190-82v40m180 0v42"/></g>
      <path d="M557 0v59m112-59v85" stroke="#8f6f58" stroke-width="3"/>
      <g fill="#bd7365"><ellipse class="hanging-lamp" cx="557" cy="73" rx="29" ry="36"/><ellipse cx="669" cy="100" rx="23" ry="29"/></g>
      <g stroke="#dfad81" stroke-width="3"><path d="M536 60h42m-45 15h48m-43 16h39m14-5h37m-39 14h41m-37 13h33"/></g>
      <path d="M261 240v89m74-89v89m91-89v89m75-89v89" stroke="#89654f" stroke-width="9"/>
      ${person(310, 318, "p", "dine", 1.55)}${person(445, 318, "e", "dine", 1.55)}
      <path d="M189 277h386l-19 34H207Z" fill="#b7825d"/><path d="M216 310v76m335-76v76" stroke="#8e644c" stroke-width="14"/>
      <g fill="#fff4df" stroke="#ad765f" stroke-width="2"><path d="M269 256h87q-5 35-44 35t-43-35Z"/><path d="M405 256h87q-5 35-44 35t-43-35Z"/></g>
      <g><ellipse cx="312" cy="256" rx="41" ry="8" fill="#96a961"/><ellipse cx="449" cy="256" rx="41" ry="8" fill="#d99a64"/>
        <g fill="#e9d9a6"><ellipse cx="294" cy="255" rx="6" ry="3"/><ellipse cx="327" cy="257" rx="7" ry="3"/><ellipse cx="433" cy="254" rx="7" ry="3"/><ellipse cx="461" cy="256" rx="6" ry="3"/></g>
        <g fill="#728650"><path d="M303 257q-15-15 4-9Z"/><path d="M455 254q8-15 17-3Z"/></g><path d="m318 254 8-3m111 7 10-4" stroke="#b7654b" stroke-width="3"/>
        <ellipse cx="383" cy="283" rx="28" ry="8" fill="#fff4df" stroke="#ad765f" stroke-width="1.5"/><path d="M365 280q0-25 18-25t18 25Z" fill="#fff7e3"/><path d="M374 268h16m-19 6h24" stroke="#e7dabe" stroke-width="1.5"/>
        <ellipse cx="530" cy="278" rx="29" ry="9" fill="#fff4df"/><g stroke="#9b754b" stroke-width="2"><path d="m511 281 33-13m-29 18 34-14"/></g><g stroke="#d0a059" stroke-width="6"><path d="m517 278 20-8m-17 13 21-8"/></g>
      </g>
      <g fill="none" stroke="#fffaf0" stroke-width="3" opacity=".8"><path class="food-steam" d="M289 244q-13-13 0-26t0-22"/><path class="food-steam steam-two" d="M462 244q-13-13 0-26t0-22"/></g>
      ${heart(379, 105, .7)}${umbrella(666, 286, .62)}
      <g transform="translate(89 274)"><path d="m-11-13 4-13 7 9 6-9 7 13" fill="#7f9964"/><path d="M-13-10h26l-3 29H-10Z" fill="#dbaf61" stroke="#b28a48" stroke-width="2"/><path d="m-9-3 18 15M9-3-9 12" stroke="#b28a48" stroke-width="2"/></g>`,

    hike: `<rect width="760" height="400" fill="#e3ece6"/>
      <circle cx="579" cy="72" r="35" fill="#e9d294"/>${cloud(155, 57)}${cloud(455, 94, .8)}
      <path d="m0 227 149-158 136 139L411 46l183 193 107-145 59 88v218H0Z" fill="#a7b9b2"/>
      <path d="m350 117 61-71 69 73-47-18-23 16-19-18Z" fill="#fff6e8"/>
      <path d="M0 265q180-135 375-33 186-115 385-35v203H0Z" fill="#819c87"/>
      <path d="M0 329q209-94 374-39 203-65 386-31v141H0Z" fill="#aeb98f"/>
      <path d="M199 400q174-59 294-99 66-28 19-44" fill="none" stroke="#e2cbae" stroke-width="48"/>
      <g fill="#597866"><path d="m64 130-46 109h29l-43 72h116l-43-72h31Z"/><path d="m689 109-45 104h27l-41 68h114l-42-68h28Z"/></g>
      <g stroke="#725f47" stroke-width="6"><path d="M65 266v65m624-72v56"/></g>
      <ellipse cx="375" cy="331" rx="120" ry="15" fill="#7f8969" opacity=".2"/>
      ${person(310, 313, "p", "hike", 1.5)}${person(436, 307, "e", "hike", 1.5)}
      <path d="M370 246q9 8 15-5" fill="none" stroke="#d6a382" stroke-width="9"/>
      <g fill="#f4e8c3"><circle cx="96" cy="350" r="4"/><circle cx="107" cy="342" r="4"/><circle cx="650" cy="349" r="4"/></g>
      <path d="m95 355 2 17m552-18v15" stroke="#708b68" stroke-width="2"/>
      ${heart(383, 90, .65)}`,

    laugh: `<rect width="760" height="400" fill="#f3e3de"/>
      <circle cx="171" cy="103" r="73" fill="#edc6bb" opacity=".65"/>
      <path d="M0 302q230-71 395-18 216-63 365-19v135H0Z" fill="#c1c49d"/>
      <g stroke="#827555" stroke-width="6"><path d="M55 297V154m645 147V142"/></g>
      <g fill="#9eae8e"><circle cx="55" cy="144" r="60"/><circle cx="699" cy="137" r="68"/></g>
      <path d="M167 243h429v25H167Zm0 32h429v17H167Z" fill="#b99676"/>
      <path d="M194 287v66m371-66v66" stroke="#6f6e60" stroke-width="11"/>
      ${person(314, 327, "p", "laugh", 1.6)}${person(445, 327, "e", "laugh", 1.6)}
      <path d="M176 331h411v16H176Z" fill="#a07d60"/>
      <g class="laugh-marks" stroke="#c88973" stroke-width="3" fill="none"><path d="m231 121-11-9m13 28-17-2m310-17 11-9m-13 28 17-2"/></g>
      <g class="laugh-caption" fill="#9d665d" font-family="Georgia, serif" font-style="italic"><text x="219" y="96" font-size="23" transform="rotate(-12 219 96)">ha!</text><text x="512" y="99" font-size="21" transform="rotate(10 512 99)">hehe</text></g>
      ${heart(383, 115, .9)}${heart(362, 80, .45)}${umbrella(611, 281, .8)}
      <g fill="#ead7a8"><ellipse cx="110" cy="373" rx="19" ry="6"/><ellipse cx="650" cy="348" rx="17" ry="5"/></g>`,

    coast: `<rect width="760" height="400" fill="#e5ebe3"/>
      <circle cx="582" cy="78" r="42" fill="#ecc887"/>${cloud(146, 58)}${cloud(383, 75, .8)}
      <path d="M0 155h760v245H0Z" fill="#9dbfbb"/>
      <g class="coastal-waves" stroke="#d4e2d4" stroke-width="3" fill="none"><path d="M0 185q50-12 100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0M-35 214q50-12 100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0"/></g>
      <path d="M0 215q150-9 249 50 151-3 230 32 139-52 281-52v155H0Z" fill="#d6c8a5"/>
      <path d="M-40 298q205-26 336 49 201-14 502-28" fill="none" stroke="#89928a" stroke-width="93"/>
      <path class="road-dashes" d="M-40 298q205-26 336 49 201-14 502-28" fill="none" stroke="#efe4c7" stroke-width="3" stroke-dasharray="31 31"/>
      <path d="m668 217 29-73 34 79Z" fill="#718b7e"/>
      <g class="coast-car">
        <ellipse cx="381" cy="351" rx="177" ry="17" fill="#65736e" opacity=".25"/>
        <path d="M250 264q18-77 75-81h126q58 7 78 81" fill="#f6ebd3" stroke="#ad6f62" stroke-width="6"/>
        <path d="M285 255v-28q0-27 24-27h143q26 0 29 27v28" fill="#abc7bd"/>
        ${person(338, 294, "p", "drive", .91)}${person(425, 294, "e", "drive", .91)}
        <circle cx="335" cy="270" r="23" fill="none" stroke="#52635c" stroke-width="5"/>
        <path d="M250 261h272q23 0 28 26l-4 40q-7 17-27 17H244q-23 0-27-22l-2-36q4-25 35-25Z" fill="#be8070" stroke="#9a665a" stroke-width="3"/>
        <path d="M226 312h311" stroke="#dda491" stroke-width="3"/>
        <g fill="#f7e3b0"><rect x="233" y="279" width="45" height="18" rx="8"/><rect x="486" y="279" width="45" height="18" rx="8"/></g>
        <rect x="316" y="278" width="133" height="25" rx="8" fill="#8f645a"/>
        <path d="M328 285h109m-109 7h109" stroke="#c89983" stroke-width="2"/>
        <rect x="355" y="315" width="55" height="18" rx="4" fill="#f3deb9"/>
        <text x="382" y="328" text-anchor="middle" fill="#7a6455" font-family="sans-serif" font-size="11">P + E</text>
        <path d="M245 336v17m274-17v17" stroke="#454f4b" stroke-width="22"/>
      </g>
      <g class="music-notes" fill="#8b9b79" font-family="Georgia, serif" font-size="27"><text x="543" y="188">♪</text><text x="573" y="158">♫</text></g>
      ${heart(383, 132, .65)}`,

    sunsetRun: `<defs>
        <linearGradient id="sunset-run-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e9cbc"/><stop offset=".48" stop-color="#eab49b"/><stop offset="1" stop-color="#f5d39c"/></linearGradient>
        <linearGradient id="sunset-run-hill" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#587360"/><stop offset="1" stop-color="#84926a"/></linearGradient>
      </defs>
      <rect width="760" height="400" fill="url(#sunset-run-sky)"/>
      <circle class="sunset-sun" cx="606" cy="112" r="52" fill="#ffe5a5" opacity=".94"/>
      <path d="M0 170q104-18 211 1t203-2q101-17 346 8v106H0Z" fill="#779ca2" opacity=".9"/>
      <g class="sunset-waves" fill="none" stroke="#dce5dc" stroke-width="3" opacity=".65"><path d="M0 201q48-11 96 0t96 0t96 0t96 0t96 0t96 0t96 0t96 0"/><path d="M-25 229q51-10 102 0t102 0t102 0t102 0t102 0t102 0t102 0"/></g>
      <path d="M0 400V305q118-66 260-45 153 22 240-24 128-68 260-31v195Z" fill="url(#sunset-run-hill)"/>
      <path d="M80 400q128-81 254-73 119 8 225-91" fill="none" stroke="#c9af85" stroke-width="47" opacity=".88"/>
      <path d="M82 400q127-71 253-64 122 8 231-96" fill="none" stroke="#e2c89e" stroke-width="3" stroke-dasharray="8 13" opacity=".7"/>
      <g class="hill-grass grass-back" fill="none" stroke="#405f51" stroke-width="4" opacity=".75">
        <path d="M29 339q2-39-9-63m10 60q13-32 26-45m-2 77q1-43-11-77m17 67q14-30 30-42M124 304q0-38-17-62m20 58q12-36 30-55m35 34q-3-39-20-65m22 61q11-36 25-56M625 279q-1-39-17-67m21 62q12-35 28-55m44 66q0-45-18-73m21 68q12-35 29-55m-5 87q6-38 25-62"/>
      </g>
      <g class="chase-motion" fill="none" stroke="#fff2d0" stroke-width="4" opacity=".8"><path d="M246 206h55M225 226h69M453 165h44"/></g>
      ${person(360, 337, "p", "run", 1.17)}
      ${person(525, 269, "e", "run", .98)}
      <g class="hill-grass grass-front" fill="none" stroke="#365647" stroke-width="5">
        <path d="M15 405q6-55-12-96m18 92q16-47 34-70m20 77q-3-57-25-94m32 89q15-42 35-67m80 67q1-49-19-83m25 79q13-43 32-69m83 70q0-39-15-65m24 61q10-35 29-59m233 65q1-53-18-89m25 85q17-48 38-73m55 76q0-50-17-88m23 83q16-43 34-65m24 69q2-41-12-71"/>
      </g>
      <g class="chase-caption" font-family="Georgia, serif" font-style="italic">
        <g><rect x="211" y="112" width="137" height="39" rx="19" fill="#fff8e8" opacity=".92"/><path d="m311 147 13 14-2-18" fill="#fff8e8" opacity=".92"/><text x="279" y="137" fill="#745e55" text-anchor="middle" font-size="17">wait for me!</text></g>
        <g><rect x="398" y="48" width="170" height="39" rx="19" fill="#fff8e8" opacity=".92"/><path d="m501 84 12 15 1-18" fill="#fff8e8" opacity=".92"/><text x="483" y="73" fill="#745e55" text-anchor="middle" font-size="15">sunset this way →</text></g>
      </g>
      ${heart(451, 114, .48)}`,
  };

  document.querySelectorAll("[data-adventure-art]").forEach((stage) => {
    const scene = stage.dataset.adventureArt;
    stage.innerHTML = `<svg class="adventure-illustration illustration-${scene}" viewBox="0 0 760 400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round">${scenes[scene]}</g></svg>`;
  });
})();
