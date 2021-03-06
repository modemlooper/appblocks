import { Component, Host, h, ComponentInterface, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'core-gallery',
  styleUrl: 'core-gallery.css',
})
export class CoreGallery implements ComponentInterface {

  @Element() el: HTMLElement;
  @Prop() data: any;


  @State() isOpen = false;
  image: string;
  caption: string;

  componentWillLoad(): void | Promise<void> {
      console.log(this.data);
      this.processHTML();
  }

  processHTML() {
 
    const div = document.createElement('div');
    div.setAttribute('class', 'appp-gallery');
    

    this.data && this.data.innerBlocks.map( item => {

      const domParser = new DOMParser();
      const doc = domParser.parseFromString(item.innerHTML, "text/html");
      const img = doc.querySelector('img');
      const caption = doc.querySelector('figcaption');  
      const slide = document.createElement('div');

      slide.setAttribute('style', `background-image: url(${img.src}); background-size: cover; background-position: center;`);
      slide.setAttribute('class', 'app-slide');
      slide.onclick = () => {
        this.image = img.src;
        if ( caption ) this.caption = caption.innerHTML;
        this.isOpen = true;
      };
      
      div.appendChild(slide);
    })

    this.el.appendChild(div);

  }

  render() {
    return (
      <Host>
        <ion-modal isOpen={this.isOpen}>
          <ion-header>
            <ion-toolbar color="dark">
              <ion-buttons>
                <ion-button onclick={()=> this.isOpen = false}><ion-icon name="close"></ion-icon></ion-button>
              </ion-buttons>
              <ion-title></ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content color="dark">
            <div style={{'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center', 'width': '100%', 'height': '100%'}}>
              <img style={{'max-height': '90%'}} src={this.image}></img>
              <figcaption style={{'font-size': '0.8em', 'padding': '4px 0'}}>{this.caption}</figcaption>
            </div>
          </ion-content>
        </ion-modal>
      </Host>
    );
  }
}
