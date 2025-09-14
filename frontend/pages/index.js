import { useState, useRef } from 'react'

export default function Home() {
    const [tab, setTab] = useState("TEXT TO SPEECH")
    const [lang, setLang] = useState("Select Language")
    const [audioUrl, setAudioUrl] = useState(null)
    const [text, setText] = useState("Select language from dropdown to load text...")
    const audioRef = useRef(null)

    const texts = {
        English: "In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the “burn it all down” kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.",
        Arabic: "في أرض إلدوريا القديمة، حيث كانت السماء تتلألأ والغابات تهمس بالأسرار للريح، عاش تنين يُدعى زيفيروس. [sarcastically] ليس من نوع \"يحرق كل شيء\"... [giggles] لكنه كان لطيفًا وحكيمًا، وعيناه تشبهان النجوم القديمة. [whispers] حتى الطيور كانت تصمت عندما يمر.",
        Hindi: "प्राचीन भूमि एल्डोरिया में, जहाँ आकाश चमकते थे और जंगल हवा को राज़ फुसफुसाते थे, वहाँ ज़ेफिरोस नाम का एक ड्रैगन रहता था। [sarcastically] वह “सब कुछ जला दो” वाला नहीं था... [giggles] बल्कि वह कोमल, बुद्धिमान था, जिसकी आँखें पुराने सितारों जैसी थीं। [whispers] जब वह गुजरता था तो पक्षी भी चुप हो जाते थे।",
        Chinese: "在古老的埃尔多利亚大地上，天空闪烁着光芒，森林向风儿低语着秘密，住着一条名叫Zephyros的龙。[sarcastically] 不是那种“烧光一切”的龙……[giggles] 但他温柔、智慧，眼睛像古老的星辰。[whispers] 连鸟儿经过时也会沉默。",
        Bengali: "প্রাচীন এলডোরিয়ার দেশে, যেখানে আকাশ ঝলমল করত এবং বনগুলি বাতাসকে গোপন কথা বলত, সেখানে একটি ড্রাগন ছিল যার নাম জেফাইরোস। [sarcastically] “সব কিছু পুড়িয়ে ফেলা” ধরনের নয়... [giggles] কিন্তু সে ছিল কোমল, বুদ্ধিমান, এবং তার চোখ ছিল পুরনো তারার মতো। [whispers] এমনকি পাখিরাও চুপ হয়ে যেত যখন সে পার হতো।"
    }

    async function fetchAudio(selected) {
  try {
    let attempts = 0;
    let success = false;
    let data;

    while (!success && attempts < 5) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/audio?lang=${encodeURIComponent(selected)}`
      );

      if (res.ok) {
        data = await res.json();
        success = true;
      } else {
        attempts++;
        if (attempts === 1) {
          alert("Backend is waking up, please wait 20–30 seconds...");
        }
        await new Promise(r => setTimeout(r, 5000)); // wait 5 sec before retry
      }
    }

    if (!success) throw new Error("Backend not responding");

    setAudioUrl(data.url);

    const full = data.url.startsWith("/")
      ? `${process.env.NEXT_PUBLIC_API_URL}${data.url}`
      : data.url;

    if (audioRef.current) {
      audioRef.current.src = full;
    }
  } catch (e) {
    console.error(e);
    alert("Failed to load audio. Please try again in a few seconds.");
  }
}

      
    function handlePlay() {
        if (!audioRef.current || !audioRef.current.src) {
            alert("No audio loaded. Select language first.")
            return
        }
        audioRef.current.play()
    }

    function handleDownload() {
        if (!audioRef.current || !audioRef.current.src) {
            alert("No audio to download.")
            return
        }
        const url = audioRef.current.src
        const a = document.createElement('a')
        a.href = url
        a.download = `${lang}.wav`
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    async function onLangChange(e) {
        const val = e.target.value
        setLang(val)

        // update textarea content
        if (texts[val]) setText(texts[val])

        // fetch audio
        await fetchAudio(val)
    }

    return (
        <div className="page">
            <header className="header">
                <div className="brand">IIElevenLabs</div>
                <div className='nav'>
                    <div className="nav-item">
                        Creative Platform
                        <div className="mega-menu">
                            {/* RESEARCH */}
                            <div className="menu-section">
                                <h4>RESEARCH</h4>
                                <div className="menu-grid">
                                    <a href="#"><span>Text to Speech</span><small>Generate human-like AI Voice</small></a>
                                    <a href="#"><span>Speech to Text</span><small>Transcribe audio and video</small></a>
                                    <a href="#"><span>Voice Changer</span><small>Deliver your audio in any voice</small></a>
                                    <a href="#"><span>Voice Cloning</span><small>Create a replica of your voice</small></a>
                                    <a href="#"><span>Voice Design</span><small>Generate a custom voice</small></a>
                                    <a href="#"><span>Voice Isolator</span><small>Extract crystal-clear speech</small></a>
                                    <a href="#"><span>Sound Effects</span><small>Generate any sound</small></a>
                                    <a href="#"><span>Music</span><small>Convert an idea into a song</small></a>
                                </div>
                            </div>

                            {/* PRODUCTS */}
                            <div className="menu-section">
                                <h4>PRODUCTS</h4>
                                <div className="menu-list">
                                    <a href="#"><span>Studio</span><small>Generate long-form audio</small></a>
                                    <a href="#"><span>Voice Library</span><small>Voices for any character</small></a>
                                    <a href="#"><span>Dubbing</span><small>Localize audio content</small></a>
                                    <a href="#"><span>ElevenLabs Mobile App</span><small>Lifelike voiceovers wherever you go</small></a>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="menu-footer">
                                <div className="highlight">
                                    <div className="v3-container">
                                        <img src="https://elevenlabs.io/_next/image?url=https%3A%2F%2Feleven-public-cdn.elevenlabs.io%2Fpayloadcms%2F8lyzgisejsr-static%20-%20v3%20-%20COLOR%20hd%20test0%201.webp&w=1920&q=95" alt="v3" />
                                    </div>
                                    <div className="text-block">
                                        <strong>MEET ELEVEN V3 (ALPHA)</strong>
                                        <p>The most expressive Text to Speech model</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className="nav-item">
                        Agent Platform
                        <div className="mega-menu">
                            {/* AGENT PLATFORM */}
                            <div className="menu-section">
                                <h4>GENERAL</h4>
                                <div className="menu-grid">
                                    <a href="#"><span>Products Overview</span><small>Discover ElevenLabs Agents</small></a>
                                    <a href="#"><span>Integrations</span><small>Connect agents to telephony and tools</small></a>
                                    <a href="#"><span>Customer Stories</span><small>Learn how customer benifits form the AI agents</small></a>

                                </div>
                            </div>

                            {/* PRODUCTS */}
                            <div className="menu-section">
                                <h4>INDUSTRIES</h4>
                                <div className="menu-list">
                                    <a href="#"><span>Telecommunications</span><small>Smarter Conversion at scale </small></a>
                                    <a href="#"><span>Retails</span><small>Increase sales and customer loyalty</small></a>
                                    <a href="#"><span>Financial Services</span><small>Deliver Secure Reliable Service</small></a>
                                    <a href="#"><span>Technology</span><small>Accelerate your business</small></a>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="menu-footer">
                                <div className="highlight">
                                    <div className="v3-container">
                                        <img src="https://elevenlabs.io/_next/image?url=https%3A%2F%2Feleven-public-cdn.elevenlabs.io%2Fpayloadcms%2F8lyzgisejsr-static%20-%20v3%20-%20COLOR%20hd%20test0%201.webp&w=1920&q=95" alt="v3" />
                                    </div>
                                    <div className="text-block">
                                        <strong>MEET ELEVEN V3 (ALPHA)</strong>
                                        <p>The most expressive Text to Speech model</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="nav-item">
                        Developers
                        <div className="mega-menu">
                            {/* RESEARCH */}
                            <div className="menu-section">
                                <h4>CREATIVE PLATFORMS</h4>
                                <div className="menu-grid">
                                    <a href="#"><span>DOCS</span><small>Deploy voice agents in minutes</small></a>
                                    <a href="#"><span>API Refrence</span><small>Get started with ElevenLabs API </small></a>
                                    <a href="#"><span>API Pricing</span><small>Pricing plans for the agents platform</small></a>
                                </div>
                            </div>

                            {/* PRODUCTS */}
                            <div className="menu-section">
                                <h4>AGENTS PLATFORMS</h4>
                                <div className="menu-list">
                                    <a href="#"><span>DOCS</span><small>Deploy voice agents in minutes</small></a>
                                    <a href="#"><span>API Refrence</span><small>Get started with ElevenLabs API </small></a>
                                    <a href="#"><span>API Pricing</span><small>Pricing plans for the agents platform</small></a>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="menu-footer">
                                <div className="highlight">
                                    <div className="v3-container">
                                        <img src="https://elevenlabs.io/_next/image?url=https%3A%2F%2Feleven-public-cdn.elevenlabs.io%2Fpayloadcms%2F8lyzgisejsr-static%20-%20v3%20-%20COLOR%20hd%20test0%201.webp&w=1920&q=95" alt="v3" />
                                    </div>
                                    <div className="text-block">
                                        <strong>MEET ELEVEN V3 (ALPHA)</strong>
                                        <p>The most expressive Text to Speech model</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>  <div className="nav-item">
                        Resources
                        <div className="mega-menu">
                            {/* RESEARCH */}
                            <div className="menu-section">
                                <h4>COMPANY</h4>
                                <div className="menu-grid">
                                    <a href="#"><span>About</span></a>
                                    <a href="#"><span>Safety</span></a>
                                    <a href="#"><span>Blog</span></a>
                                    <a href="#"><span>Careers</span></a>
                                </div>
                            </div>

                            {/* PRODUCTS */}
                            <div className="menu-section">
                                <h4>INITIATIVES</h4>
                                <div className="menu-list">
                                    <a href="#"><span>Impact Program</span></a>
                                    <a href="#"><span>Voice Partnerships</span></a>
                                    <a href="#"><span>Grant For Startups</span></a>
                                    <a href="#"><span>For Students</span></a>
                                    <a href="#"><span>Affiliate Program</span></a>
                                    <a href="#"><span>Commercial Partnerships</span></a>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="menu-footer">
                                <div className="highlight">
                                    <div className="v3-container">
                                        <img src="https://elevenlabs.io/_next/image?url=https%3A%2F%2Feleven-public-cdn.elevenlabs.io%2Fpayloadcms%2F8lyzgisejsr-static%20-%20v3%20-%20COLOR%20hd%20test0%201.webp&w=1920&q=95" alt="v3" />
                                    </div>
                                    <div className="text-block">
                                        <strong>MEET ELEVEN V3 (ALPHA)</strong>
                                        <p>The most expressive Text to Speech model</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="nav-item">
                        Enterprise
                    </div>

                    <div className="nav-item">
                        Pricing
                    </div>

                </div>


                <div className="auth">
                    <a className="link">Log in</a>
                    <button className="primary">Sign up</button>
                </div>
            </header>

            <main className="main">
                <h1>The most realistic voice AI platform</h1>
                <p className="sub">AI voice models and products powering millions of developers, creators, and enterprises. From low‑latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.</p>
                <div className='btns'>
                    <div className="auth">
                        <button className="primary" style={{ marginRight: '5px' }}>SIGN UP</button>
                        <button className="primary2" >CONTACT SALES</button>

                    </div>
                </div>
                <div className="tabs">
                    {["TEXT TO SPEECH", "AGENTS", "MUSIC", "SPEECH TO TEXT", "DUBBING", "VOICE CLONING", "ELEVENREADER"].map(t => (
                        <div
                            key={t}
                            className={`tab ${t === tab ? "active" : ""}`}
                            onClick={() => setTab(t)}
                        >
                            {t}
                        </div>
                    ))}
                </div>


                <div className="card">
          <div className="tab-content">
            {tab === "TEXT TO SPEECH" ? (
              <>
                <textarea
                  className="text-box"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

        {/* Option buttons (fake presets, UI only) */}
        <div className="buttons">
          <div className="btn"><img src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fimages%2Fvoices%2Forbs%2Fgray.webp&w=32&q=95" height={20} width={20} style={{marginRight: '5px'}} alt=""/>Samara | Narrate a story</div>
          <div className="btn"><img src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fimages%2Fvoices%2Forbs%2Fjessica.webp&w=32&q=95" height={20} width={20} style={{marginRight: '5px'}} alt=""/>2 speakers | Create a dialogue</div>
          <div className="btn"><img src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fimages%2Fvoices%2Forbs%2Fgray.webp&w=32&q=95" height={20} width={20} style={{marginRight: '5px'}} alt=""/>Announcer | Voiceover a game</div>
          <div className="btn"><img src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fimages%2Fvoices%2Forbs%2Fjessica.webp&w=32&q=95" height={20} width={20} style={{marginRight: '5px'}} alt=""/>Sergeant | Play a drill sergeant</div>
          <div className="btn"><img src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fimages%2Fvoices%2Forbs%2Fgray.webp&w=32&q=95" height={20} width={20} style={{marginRight: '5px'}} alt=""/>Spuds | Recount an old story</div>
          <div className="btn"><img src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fimages%2Fvoices%2Forbs%2Fjessica.webp&w=32&q=95" height={20} width={20} style={{marginRight: '5px'}} alt=""/>Jessica | Provide customer support</div>
        </div>
                <div className="controls">
                  <div>
                    <select value={lang} onChange={onLangChange} className="lang">
                      <option value="Select Language">🌐 Select Language</option>
                      <option value="English">🇺🇸 English</option>
                      <option value="Arabic">🇸🇦 Arabic</option>
                      <option value="Hindi">🇮🇳 Hindi</option>
                      <option value="Chinese">🇨🇳 Chinese</option>
                      <option value="Bengali">🇧🇩 Bengali</option>
                    </select>
                  </div>
                  
                  
                  <div className="buttons">
                    
                    <button onClick={handlePlay} className="play-btn">▶ PLAY</button>
                    <button onClick={handleDownload} className="download"></button>
                  </div>
                </div>

                <div className="footer">Powered by Eleven v3 (alpha)</div>
              </>
            ) : (
              <div style={{ padding: 40 }}>This tab is empty for the assignment.</div>
            )}
          </div>
        </div>

            </main>

            <audio style={{ display: 'none' }} ref={audioRef} />
            <style jsx>{`
  .page{font-family:Inter,system-ui,Arial,Helvetica,sans-serif;color:#111;background:#fff}
  .header{display:flex;justify-content:space-between;align-items:center;padding:20px 40px}
 .nav { display:flex; gap:4px; align-items:center; }
.nav-item { position:relative; padding:10px; cursor:pointer; font-weight:500; }
.mega-menu { display:none; position:absolute; top:calc(100% + 6px);  left:50%;
  transform:translateX(-40%); background:#fff; border:1px solid #eee; box-shadow:0 6px 20px rgba(0,0,0,0.08); padding:24px; border-radius:12px; min-width:700px; grid-template-columns:2fr 1fr; gap:40px; z-index:1000; }
.menu-section h4 { margin:0 0 12px; font-size:13px; font-weight:600; color:#666; letter-spacing:1px; }
.menu-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:6px 32px; }
.menu-list { display:flex; flex-direction:column; gap:6px; }
.menu-grid a, .menu-list a { text-decoration:none; color:#222; }
.menu-grid a span, .menu-list a span { display:block; font-size:15px; font-weight:500; }
.menu-grid a small, .menu-list a small { display:block; font-size:12px; color:#666; }
.menu-grid a:hover span, .menu-list a:hover span { color:#000; }
.menu-footer { grid-column:1 / -1; margin-top:12px;     border-top:1px solid #eee; }
.highlight { 
  background:#f7f7fb; 
  padding:12px 16px; 
  border-radius:0px 0px 12px 12px; 
  font-size:13px; 
  color:#444; 
  position:absolute; 
  left:0; 
  right:0; 
  bottom:0; 
  display:flex; 
  align-items:center; 
  gap:12px; 
}

.v3-container img { 
  width:40px; 
  height:40px; 
  overflow:hidden; 
  border-radius:6px; 
  flex-shrink:0; 
}

.text-block { 
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
}

.text-block strong { 
  font-size:13px; 
  margin-bottom:2px; 
  color:#333; 
}

.text-block p { 
  margin:0; 
  font-size:12px; 
  color:#666; 
}

.menu-section a { padding:8px 12px; }
.nav-item:hover .mega-menu { display:grid; }
.nav-item:hover { background:#f9f9f9; border-radius:6px; }
.menu-section a:hover { background:#f9f9f9; border-radius:6px; }




  .link{font-weight:500;padding-right:10px; cursor:pointer}
  .primary{font-weight:600;cursor:pointer;}
  .primary2{font-weight:600;cursor:pointer}
  .brand{font-weight:700;font-style:bold;font-size:20px}
  .auth button{margin-left:10px}
  .auth .primary{background:#000;color:#fff;padding:10px 14px;border-radius:20px;border:0;font-size:16px}
  .auth .primary2{background:#f3f3f3;color:#000;padding:10px 14px;border-radius:20px;border:0;font-size:16px}
  .main{    max-width: 980px;
    margin: 60px auto;
    padding: 20px;
    display: flex
;
    text-align: center;
    align-items: center;
    flex-direction: column;}

.btns{margin-top:1%;margin-bottom:6%;}

    h1{font-size:45px;font-weight:500;margin:10px 0}
  h4{font-family:bold;font-weight:600}
  .sub{font-weight:500;margin-bottom:20px;max-width:81%; font-size:18px;}
  .card{border-top:5px solid #f3f3f3; border-right:5px solid #f3f3f3;border-left:5px solid #f3f3f3;border-bottom:50px solid #f3f3f3;min-width:90%;max-width:90%;background:#fff;border-radius:12px;padding:20px;box-shadow:0 6px 20px rgba(0,0,0,0.06);text-align:left}
  .tabs{display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap;font-weight:600}
  .tab{padding:8px 8px;border:1px solid #e6e6e6;border-radius:10px;background:#fff;cursor:pointer}
  .tab.active{border:1px solid #000;background:#f3f3f3;border-radius:10px;font-weight:600}  
  .editor{width:100%;min-height:140px;border-radius:10px;padding:16px;border:1px solid #eee;resize:vertical}
  .controls{display:flex;justify-content:space-between;align-items:center;margin-top:12px;}
  .buttons button{margin-left:8px;padding:8px 12px;border-radius:8px;border:0;cursor:pointer}
  .buttons .play{background:#000;color:#fff}
  .buttons .download{background:url('https://th.bing.com/th/id/OIP.yXOyCwScbjD1fK-mW45RzAAAAA?w=180&h=180&c=7&r=0&o=7&pid=1.7&rm=3'); background-size:cover; background-position:center; background-repeat:no-repeat; width:22px; height:24px}
  .footer{margin:24px auto;text-align:center;color:#666;font-size:13px}


.text-box {
  font-size: 16px;
  line-height: 1.6;
  border-radius: 12px;
  background: #fff;      /* pure white like screenshot */
  padding: 20px;
  border: none;          /* remove border */
  width: 100%;
  min-height: 140px;
  resize: none;          /* disable resize handle */
  outline: none;         /* remove blue outline */
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  color: #111;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.btn {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.btn:hover {
  background: #f0f0f0;
}

.lang {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  background: #fff;
}

.play-btn {
  background: black;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
}

.play-btn:hover {
  background: #333;
}

.footer {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
  color: gray;
}

`}</style>

        </div>
    )
}
