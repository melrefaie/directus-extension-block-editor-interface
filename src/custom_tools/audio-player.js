const i = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M10 10.5606V13.4394C10 14.4777 11.1572 15.0971 12.0211 14.5211L14.1803 13.0817C14.9536 12.5661 14.9503 11.4317 14.18 10.9181L12.0214 9.47907C11.1591 8.9042 10 9.5203 10 10.5606Z"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>';
class n {
  constructor({ data: t }) {
    this.data = t, this.nodes = {
      wrapper: null,
      input: null,
      audio: null
    };
  }
  static get toolbox() {
    return {
      title: "AudioPlayer",
      icon: i
    };
  }
  render() {
    this.nodes.wrapper = document.createElement("div"), this.nodes.input = document.createElement("input"), this.nodes.audio = document.createElement("audio"), this.nodes.wrapper.classList.add("wrapper"), this.nodes.audio.setAttribute("controls", "controls"), this.nodes.input.type = "text", this.nodes.input.name = "audioUrl", this.nodes.input.placeholder = "Enter your url of audio file", this.nodes.input.value = this.data.src ? this.data.src : "", this.nodes.input.classList.add("cdx-input"), this.nodes.input.addEventListener("change", () => {
      var s;
      const e = (s = this.nodes.input) == null ? void 0 : s.value;
      e ? this.nodes.audio.setAttribute("src", e) : this.nodes.audio.removeAttribute("src");
    });
    const { src: t } = this.data;
    return t && this.nodes.audio.setAttribute("src", t), this.nodes.wrapper.appendChild(this.nodes.input), this.nodes.wrapper.appendChild(this.nodes.audio), this.nodes.wrapper;
  }
  save(t) {
    return {
      src: t.querySelector("audio").src
    };
  }
  validate(t) {
    return !(t.src === "" && !t.src.trim());
  }
}
export {
  n as default
};
