import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'core-pullquote',
  styleUrl: 'core-pullquote.css',
})
export class CorePullquote {

  @Prop() data: any;

  componentWillLoad(): void | Promise<void> {
      console.log(this.data);
  }

  render() {
    return (
      <Host class="ion-padding" innerHTML={ this.data.innerHTML }>
      </Host>
    );
  }

}
