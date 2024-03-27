import { HttpContext } from '@adonisjs/core/http'
import { ApplicationService } from '@adonisjs/core/types'
import { KeycloakConfig } from '../standalone.js'

export default class KeycloakProvider {
  constructor(protected app: ApplicationService) {}

  public async boot() {
    const Ally = (await this.app.container.make('Adonis/Addons/Ally')) as any
    const { KeycloakDriver } = await import('../src/Keycloak/index.js')

    Ally.extend('keycloak', (_: any, __: any, config: KeycloakConfig, ctx: HttpContext) => {
      return new KeycloakDriver(ctx, config)
    })
  }
}
