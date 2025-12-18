'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <Link href="/" className="text-primary hover:underline mb-8 inline-block">
        ← Back to the Fun
      </Link>

      <h1 className="text-4xl font-black text-primary mb-2">The Boring Legal Stuff</h1>
      <p className="text-white/50 mb-2">Last Updated: December 18, 2025</p>
      <p className="text-yellow-400 mb-8 text-sm">☕ Grab a coffee. This is the fine print nobody reads (but you totally should).</p>

      <div className="space-y-8 text-white/80">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Welcome to the Bunch! 🎉</h2>
          <p>
            By using Brainy Bunch, you&apos;re basically saying &quot;I promise to play nice and not
            blame you if Uncle Jerry gets too competitive and flips the table.&quot; If you don&apos;t
            agree with these terms, we&apos;ll miss you, but the exit is that way. 👈
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. What Even Is This? 🤔</h2>
          <p>
            Brainy Bunch is a free trivia game for family gatherings. It&apos;s designed to spark
            friendly competition, settle debates about who&apos;s the smartest, and give Grandma
            a chance to flex her 80s music knowledge. We provide it &quot;as is&quot; — meaning
            if it breaks during Christmas dinner, we&apos;ll feel bad but can&apos;t promise anything.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. House Rules 🏠</h2>
          <p className="mb-2">By playing, you solemnly swear to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Not be a jerk (the golden rule)</li>
            <li>Accept defeat gracefully (no rage-quitting)</li>
            <li>Not hack the game to make yourself look smarter</li>
            <li>Keep your player name PG (looking at you, cousin Kevin)</li>
            <li>Not blame us for any family drama that ensues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Our Stuff is Our Stuff 📝</h2>
          <p>
            All the trivia questions, the fancy graphics, the code that makes buttons go
            &quot;click&quot; — that&apos;s ours. Feel free to enjoy it, but please don&apos;t copy it
            and claim you made it. That&apos;s not cool, and your mom would be disappointed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. The &quot;Please Don&apos;t Sue Us&quot; Section ⚖️</h2>
          <p>
            THIS GAME IS PROVIDED &quot;AS IS&quot; — BUGS, TYPOS, AND ALL. WE&apos;RE NOT
            RESPONSIBLE IF: the game crashes during the final round, you lose to your
            8-year-old niece, or Die Hard gets classified as a non-Christmas movie in
            our questions (IT&apos;S A CHRISTMAS MOVIE, FIGHT US).
          </p>
          <p className="mt-3 text-white/60 text-sm">
            Basically, play at your own risk. We&apos;re just here to help families have fun,
            not to guarantee a bug-free, argument-free experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Things We&apos;re Not Responsible For 🙈</h2>
          <p className="mb-2">We cannot be held liable for:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Family arguments about trivia answers</li>
            <li>Hurt feelings when you lose</li>
            <li>Smug winners who won&apos;t stop bragging</li>
            <li>Any claims that &quot;the answer was wrong&quot; (it wasn&apos;t, you just didn&apos;t know)</li>
            <li>Broken relationships due to competitive gameplay</li>
            <li>Spilled drinks on devices during intense rounds</li>
            <li>The realization that your kids are smarter than you</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">7. The &quot;You Got Our Back&quot; Promise 🤝</h2>
          <p>
            If you do something silly with our game and someone comes after us with pitchforks
            (or lawyers), you agree to step in and say &quot;Hey, that was my bad, leave these
            nice trivia people alone.&quot; In legal speak, that&apos;s called indemnification.
            In regular speak, it&apos;s called being a good human.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">8. About Those Trivia Answers... 🤓</h2>
          <p>
            We try really hard to get everything right. Like, REALLY hard. But we&apos;re human
            (mostly), and sometimes mistakes happen. If you spot an error, don&apos;t @ us on
            social media — just know that trivia is meant to be fun, not a doctoral thesis defense.
          </p>
          <p className="mt-3 text-yellow-400 text-sm">
            Pro tip: If you think an answer is wrong, just accept it and move on.
            It builds character. 💪
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">9. Privacy (We Don&apos;t Want Your Data) 🔒</h2>
          <p>
            Unlike those creepy apps that track your every move, we literally don&apos;t care.
            We don&apos;t store your name, we don&apos;t track you, we don&apos;t sell anything to
            anyone. The only thing we know about you is that you have excellent taste in
            family games. Your game session disappears faster than cookies at a family reunion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">10. We Might Change Things 🔄</h2>
          <p>
            We reserve the right to update these terms whenever we feel like it. We probably
            won&apos;t make them more boring, but we might add more jokes. If you keep playing
            after changes, that means you&apos;re cool with the new terms. It&apos;s like an
            unspoken agreement, but written down.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">11. The Canada Clause 🍁</h2>
          <p>
            These terms are governed by Canadian law, which means we&apos;re legally required
            to be polite about everything. Sorry if any of this sounds harsh — we really
            did try to make legal terms fun. If there&apos;s ever a dispute, we&apos;ll handle it
            in Canada, probably over coffee and donuts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">12. The Fine Print About Fine Print 📜</h2>
          <p>
            If any part of these terms turns out to be unenforceable (lawyers love finding
            loopholes), the rest of the terms still apply. Think of it like Jenga — even
            if one block falls, the tower stays up. Mostly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">13. TL;DR (Too Long; Didn&apos;t Read) 📖</h2>
          <div className="bg-white/5 rounded-xl p-4">
            <ul className="space-y-2">
              <li>✅ Play nice</li>
              <li>✅ Have fun with your family</li>
              <li>✅ Don&apos;t blame us for family drama</li>
              <li>✅ Accept that you might lose sometimes</li>
              <li>✅ We don&apos;t track you or want your data</li>
              <li>✅ The trivia is for fun, not facts</li>
              <li>✅ Canadian law applies, sorry not sorry</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">14. Questions? 💬</h2>
          <p>
            If you actually read all of this, you deserve a medal. 🏅 If you have questions,
            concerns, or just want to tell us your high score, feel free to reach out.
            We&apos;re friendly, we promise!
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-white/40 text-sm mb-4">
          You made it to the end! You&apos;re officially a terms-and-conditions champion. 🏆
        </p>
        <Link href="/" className="btn-primary inline-block">
          Back to Being Brainy! 🧠
        </Link>
      </div>
    </main>
  );
}
