export class ExternalScripts {
  constructor (scriptStore) {
    this.scripts = []
    scriptStore.forEach(script => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      }
    })
  }
  load (scripts) {
    const promises = []
    const scriptArray = scripts || this.scripts
    for (let script in scriptArray) {
      promises.push(this.loadScript(script))
    }
    return Promise.all(promises)
  }
  loadScript (name) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name].loaded) {
        resolve({
          script: name,
          loaded: true,
          status: 'Already Loaded'
        })
      } else {
        // load script
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = this.scripts[name].src
        if (script.readyState) { // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null
              this.scripts[name].loaded = true
              resolve({
                script: name,
                loaded: true,
                status: 'Loaded'
              })
            }
          }
        } else { // Others
          script.onload = () => {
            this.scripts[name].loaded = true
            resolve({
              script: name,
              loaded: true,
              status: 'Loaded'
            })
          }
        }
        script.onerror = () => resolve({
          script: name,
          loaded: false,
          status: 'Loaded'
        })
        document.body.appendChild(script)
      }
    }).catch(err => {
      console.error(err)
    })
  }
}
