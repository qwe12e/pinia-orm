import { Store, PiniaPlugin, StoreDefinition, Pinia } from 'pinia'
import { Database } from '../database/Database'
import { plugins, components } from '../plugin/Plugin'

export interface InstallOptions {
  namespace?: string
}

type FilledInstallOptions = Required<InstallOptions>

/**
 * Install Vuex ORM to the store.
 */
export function install(): PiniaPlugin {
  return (store) => {
    mixin(store.store)
  }
}

/**
 * Create options by merging the given user-provided options.
 */
function createOptions(options: InstallOptions = {}): FilledInstallOptions {
  return {
    namespace: options.namespace ?? 'entities',
  }
}

/**
 * Mixin Vuex ORM feature to the store.
 */
function mixin(store: Store<any>): void {
  installPlugins(store)
}

/**
 * Execute registered plugins.
 */
function installPlugins(store: Store<any>): void {
  plugins.forEach((plugin) => {
    const { func, options } = plugin

    func.install(store, components, options)
  })
}
