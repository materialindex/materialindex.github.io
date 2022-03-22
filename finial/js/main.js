//git add --all && git commit -m "finial update" && git push -u origin
const localCsv = [
    [
        "",
        "",
        "",
        ""
    ],
    [
        "",
        "",
        "",
        ""
    ],
    [
        "title",
        "Home",
        "Finial",
        "h1"
    ],
    [
        "title",
        "Home",
        "Bespoke - Off-site - Sustainable",
        "p"
    ],
    [
        "",
        "",
        "",
        ""
    ],
    [
        "page1",
        "Site Specific",
        "https://lid.zoocdn.com/645/430/8e2453196f0c5035f888ed0c2b9881a958262fb5.jpg",
        "img"
    ],
    [
        "page1",
        "Site Specific",
        "We design, construct and develop specific solutions for complex sites. Our multi-disciplinary team follows a digitized design and construction process, making use of the latest technology in construction to unlock complex locations, quickly and at low development risk.",
        "p"
    ],
    [
        "",
        "",
        "",
        ""
    ],
    [
        "page2",
        "Production",
        "Factory shot of a CNC machine/TH factory interior",
        "img"
    ],
    [
        "page2",
        "Production",
        "Our expertise is in design, modular building architecture and innovative timber engineering. We pre-assemble our structures off-site for a high-quality finish and a fast installation. Due to innovations in machine cutting and advances in design software these structures can be geometrically complex and bespoke to each site.",
        "p"
    ],
    [
        "",
        "",
        "",
        ""
    ],
    [
        "page3",
        "Installation",
        "https://previews.123rf.com/images/sentavio/sentavio2002/sentavio200200099/140365854-industrial-isometric-city-scene-generator-creator-vector-design-objects-illustration-factory-plant-w.jpg",
        "img"
    ],
    [
        "page3",
        "Installation",
        "Offsite construction enables rapid on site delivery, which can unlock previously unviable sites.",
        "p"
    ],
    [
        "",
        "",
        "",
        ""
    ],
    [
        "page4",
        "Sustainability",
        "CLT lined interior surface finish (see Detail magazine module book)",
        "img"
    ],
    [
        "page4",
        "Sustainability",
        "We are passionate about a holistic approach to sustainability. Sustainability in buildings is more complex than most other domains and is often poorly understood. It must take into account operational and embodied energy during the construction and the life of the building. In the jargon, it rests upon a number of dynamic contingencies. None of us know for certain what the future energy mix will be, the true lifespan of our buildings, the possibilities for future recycling, or the embodied carbon cost of our modern supply chains. Nonetheless it is possible through rigorous scenario planning, access to expertise and advanced digital modelling to make highly educated guesses. This process is at the heart of what we do and also how we do it.",
        "p"
    ],
    [
        "page4",
        "Sustainability",
        "In many ways our approach is inherently sustainable with a much lower impact than other forms of development. Off-site construction saves 30% on building waste (WRAP statistic). 45% of all UK building waste is from construction (WRAP statistic). Re-using existing building through roof-top and other extensions saves a huge amount of embodied energy. We are committed to using low-carbon and low pollutant materials in our supply chain and making use of the most appropriate tools fo heating and cooling. Above all, we design for change, building in carbon assessment into our lifecycle modelling, considering both future building use and disassembly.",
        "p"
    ],
    [
        "",
        "",
        "",
        ""
    ],
    [
        "page5",
        "About",
        "",
        ""
    ],
    [
        "page5",
        "About",
        "Finial was started by two Cambridge graduates, a software engineer and Architect with experience in new mapping technology and off-site construction, with a belief that the quiet technological revolution currently happening in the construction industry opens up sites that traditionally would have been closed off to development as to difficult to build on. We enjoy solving this challenge and know it offers a route to a more sustainable urbanity.",
        "p"
    ]
]

new Vue({
        el: '#app',
        data : ()=>({
            pages: {},
            order:[]
    }),
    methods: {
        createPages(data) {
            console.log(data)

            const pages = data.forEach((x) => {
                const key = x[0]
                const newPage = () => {
                    return { 
                        items: [],
                        zIndex: 1000 - this.order.length,
                        opacity: 1,
                    }
                }

                if (!key) return null
                if (!this.pages[key]) this.$set(this.pages, key, newPage())
                console.log(this.pages)
    
                this.pages[key].items.push({
                    title: x[1].trim(),
                    text: x[2].trim(),
                    tag: x[3].trim(),
                    opts: x[4] ? JSON.parse(x[4]) : {}
                })
                if (!this.order.includes(key)) this.order.push(key)
  
            })
            
        },
        sendToBack(key) {
            setTimeout(() => {
                this.pages[key].zIndex = this.pages[key].zIndex - (this.order.length + 1)
                this.pages[key].opacity = 1
            },500)
        }

        },
    created() {
        const self = this
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbnyK0aEKSGyBVqQ3cLfa4SbY8voYHP4TVR57teJc9NZCyb424akAC9Y9ECNr2n36-LC9jAlKEw_br/pub?gid=0&single=true&output=csv'
        const dev = window.location.href.indexOf('ellisdodwell') > -1
        if (dev) {
            this.createPages(localCsv)
        } else {
            Papa.parse(sheetUrl, {
                download: true,
                complete: response => this.createPages(response.data)
            })
        }
        /*document.addEventListener('scroll', function (e) {
            const highestPage = Object.keys(self.pages).sort((a, b) => {
                self.pages[b].zIndex > self.pages[a].zIndex ? 1 : -1
            })[0]
            self.sendToBack(highestPage);
        })*/
        },
    template: `
    <div class="container-fluid">
    <div class="row px-3 py-3 flex-column flex-sm-row align-items-stretch">

      <div class="panel col-12 col-sm-3 d-flex flex-column justify-content-between">
        <div class="row">

          <div id="title-panel" class="col-7 col-sm-12">
            <h1>Finial</h1>
            <h3></h3>

          </div>
          <div id="control-panel" class="col-5 col-sm-12">
          </div>

        </div>

        <div id="company-panel">
            <p>19 Croftdown Rd</p>
            <p>London</p>
            <p>N64BD</p>
            <p>United Kingdom</p>
            <div style="height:10px;"></div>
            <p>Registered as Finial Ltd in England No. XXXXXXXX</p>
        </div>
      </div>

      <div id="main-panel" class="panel col-12 col-sm-6">

          <div v-for="(page,key) in pages"
          class="cardx d-flex flex-column justify-content-center align-items-center"
          :style="{zIndex: page.zIndex, opacity: page.opacity }"
          @click="pages[key].opacity=0;sendToBack(key)"
          >
          
            <div v-for="item in page.items" style="flex:1;" class="px-3 py-3">
            <img v-if="item.tag==='img'" :src="item.text" :class="item.class" :style="item.style"/>
            <video v-else-if="item.tag==='video'" :poster="item.opts.poster" autoplay muted playsinline loop>
              <source :src="item.text" :type="item.opts.type"/>
            </video>
            <component v-else :is="item.tag" :class="item.class" :style="item.style">
              {{ item.text }}
            </component>
            </div>
          </div>

      </div>

      <footer id="contact-panel">

        <div id="company-panel-mobile">
            <p>19 Croftdown Rd</p>
            <p>London</p>
            <p>N64BD</p>
            <p>United Kingdom</p>
            <div style="height:10px;"></div>
            <p>Registered as Finial Ltd in England No. XXXXXXXX</p>
        </div>


      </footer>

    </div>

  </div>
        `
})