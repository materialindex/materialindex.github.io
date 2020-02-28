(function(){

  class HTML {
    constructor (project) {
      this.project = project
    }

    el (type, child, classList) {
      let el = document.createElement(type)
      if (classList) el.classList = classList
      if (!child) return el
      if (typeof child === 'object')
      el.appendChild(child)
      else
      el.appendChild(document.createTextNode(child))

      return el
    }

    img (src,alt,classList) {
      const img = this.el('img',null,classList)
      img.src = src
      img.alt = alt || src
      return img
    }

    a (href, child, classList) {
      const a = this.el('a',child,classList)
      a.href = href
      return a
    }

  }

  class Project extends HTML {
    constructor (project, index) {
      super()
      this.project = project
      this.index = index
    }

    createTags () {
      return this.el('div',this.project.tags.join(', '),'tags font-weight-bolder')
    }

    createGlyphs () {
      const el = this.el('div',null,'glyphs')
      if (!this.project.github) return el
      const link = this.a(this.project.github, this.img(config.dirImg+'github.svg') )
      el.appendChild(link)
      return el
    }

    createDesc () {
      const el = this.el('div',this.project.desc,'description')
      return el
    }

    createTitle () {
      const el = this.el('h2',this.project.title)
      return el
    }

    createLink() {
      const text = this.project.website.replace(/https?:\/\//,'').replace('/','')
        return this.el('div', this.a(this.project.website, text))
      }

      html () {
        const outer = this.el('div',null)
        outer.setAttribute('index',this.index)
        outer.classList = 'col-item col-xs-12 col-sm-6 col-md-6 col-lg-4'
        outer.addEventListener("click", Actions.toV2)
        const inner = this.el('div',null,'project')

        inner.appendChild(this.createTitle())
        inner.appendChild(this.createLink())
        inner.appendChild(this.createDesc())
        inner.appendChild(this.createGlyphs())
        inner.appendChild(this.createTags())

        outer.appendChild(inner)
        return outer
      }

    }


    const Actions = (function () {
      const panelNames = ['control','project','info']
      const PANELS = panelNames.map(
        x => document.getElementById(x+'-panel')
      )

      const updateProjectsStyle = (style) => {
        Array.from(document.getElementsByClassName('col-item'))
        .forEach(colItem=>Object.assign(colItem.style,style))
      }

      const hideElementsByClass = (className) => {
        Array.from(document.getElementsByClassName(className))
        .forEach(el=>el.style.height = 0)
      }

      const updatePanelClasses = function(version) {
        PANELS.forEach((el,i)=>el.classList = config.panel[version][panelNames[i]])
      }

      const toV1 = function () {
        document.body.style.background = config.body.v1.background
        updatePanelClasses('v1')
        updateProjectsStyle({minWidth:'200px;'})
        setTimeout(()=>{
          PANELS.forEach(x=>x.classList.remove('minimise'))
        },800)
      }

      const toV2 = function (el)  {
        //updateProjectsStyle({minWidth:'100%'})
        el = el.currentTarget
        const index = el.getAttribute('index')
        const item = items[index]
        const imgs = item.img
        const img = new HTML().img(config.dirImg+imgs[0])
        const clone = el.cloneNode(true)
        clone.classList = "col-item"

        document.body.style.background = config.body.v2.background

        const [controlPanel, projectPanel, infoPanel] = PANELS

        el.classList.remove('col-item')
        //projectPanel.classList = config.panel.v2.project
        infoPanel.replaceChild(clone, infoPanel.firstChild )

        //img.style.opacity = 1;

        const colItems = Array.from(document.getElementsByClassName('col-item'))

        colItems.reverse().forEach((item,i)=>{
          item.classList.add('minimise')
          setTimeout(()=>{
            const clone = item.cloneNode(true)
            item.style.visibility = 'hidden'
            controlPanel.appendChild(clone)
          },100*i)
        })

        setTimeout(()=>{
          const pos = el.getBoundingClientRect()
          console.log(pos)
          el.style.transform = `translateX(${window.innerWidth - pos.x -pos.width}px)`
          el.style.maxWidth = document.getElementById('info-panel').getBoundingClientRect().width
          projectPanel.innerHtml = ''
          projectPanel.appendChild(img);
          setTimeout(()=>{
            img.style.opacity = 1
          },500)

          //el.classList.add('col-active')
        },100*colItems.length-5)

        setTimeout(()=>{
          //updatePanelClasses('v2')
        },1000)

        //document.body.style.background = '#999'
      }

      return {
        toV1 : toV1,
        toV2 : toV2,
        updatePanelClasses : updatePanelClasses,
      }

    })()


    const config = {
      dirImg : 'img/',
      panelBase : 'panel col-xs-12 ',
      body : {
        v1 : {
          background: '#f7f7f7'
        },
        v2 : {
          background:'#efeeee'
        },
      },
      get panel () {
        return {
          v1 : {
            control : this.panelBase + 'col-sm-2',
            project : this.panelBase + 'col-sm-8',
            info :  this.panelBase + 'col-sm-2'
          },
          v2 : {
            project :  this.panelBase + 'col-md-3 col-lg-2 minimise',
            img :  this.panelBase + 'col-md-6 offset-lg-1',
            info :  this.panelBase + 'col-md-3 col-lg-2 offset-lg-1'
          }
        }
      }
    }

    const html = document.getElementById('project-panel').firstElementChild


    Actions.updatePanelClasses('v1')

    document.getElementById('btn-toggle')
      .addEventListener('click',Actions.toV1)


    items.forEach((item,i)=>{
      html.appendChild(new Project(item,i).html())
    })
  })()
