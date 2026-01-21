import { Match, Show, Switch } from "solid-js";
import { useI18n } from "../../i18n";

import { formatBytes, formatRelativeTime, isTauriRuntime } from "../utils";

import Button from "../components/button";
import { HardDrive, RefreshCcw, Shield, Smartphone } from "lucide-solid";

export type SettingsViewProps = {
  mode: "host" | "client" | null;
  baseUrl: string;
  headerStatus: string;
  busy: boolean;
  developerMode: boolean;
  toggleDeveloperMode: () => void;
  stopHost: () => void;
  engineSource: "path" | "sidecar";
  setEngineSource: (value: "path" | "sidecar") => void;
  isWindows: boolean;
  defaultModelLabel: string;
  defaultModelRef: string;
  openDefaultModelPicker: () => void;
  showThinking: boolean;
  toggleShowThinking: () => void;
  modelVariantLabel: string;
  editModelVariant: () => void;
  demoMode: boolean;
  toggleDemoMode: () => void;
  demoSequence: "cold-open" | "scheduler" | "summaries" | "groceries";
  setDemoSequence: (value: "cold-open" | "scheduler" | "summaries" | "groceries") => void;
  themeMode: "light" | "dark" | "system";
  setThemeMode: (value: "light" | "dark" | "system") => void;
  updateAutoCheck: boolean;
  toggleUpdateAutoCheck: () => void;
  updateStatus: {
    state: string;
    lastCheckedAt?: number | null;
    version?: string;
    date?: string;
    notes?: string;
    totalBytes?: number | null;
    downloadedBytes?: number;
    message?: string;
  } | null;
  updateEnv: { supported?: boolean; reason?: string | null } | null;
  appVersion: string | null;
  checkForUpdates: () => void;
  downloadUpdate: () => void;
  installUpdateAndRestart: () => void;
  anyActiveRuns: boolean;
  onResetStartupPreference: () => void;
  openResetModal: (mode: "onboarding" | "all") => void;
  resetModalBusy: boolean;
  pendingPermissions: unknown;
  events: unknown;
  safeStringify: (value: unknown) => string;
  repairOpencodeCache: () => void;
  cacheRepairBusy: boolean;
  cacheRepairResult: string | null;
  notionStatus: "disconnected" | "connecting" | "connected" | "error";
  notionStatusDetail: string | null;
  notionError: string | null;
  notionBusy: boolean;
  connectNotion: () => void;
};

export default function SettingsView(props: SettingsViewProps) {
  const { t, locale, setLocale } = useI18n();
  const updateState = () => props.updateStatus?.state ?? "idle";
  const updateNotes = () => props.updateStatus?.notes ?? null;
  const updateVersion = () => props.updateStatus?.version ?? null;
  const updateDate = () => props.updateStatus?.date ?? null;
  const updateLastCheckedAt = () => props.updateStatus?.lastCheckedAt ?? null;
  const updateDownloadedBytes = () => props.updateStatus?.downloadedBytes ?? null;
  const updateTotalBytes = () => props.updateStatus?.totalBytes ?? null;
  const updateErrorMessage = () => props.updateStatus?.message ?? null;

  const notionStatusLabel = () => {
    switch (props.notionStatus) {
      case "connected":
        return t('settings.notion.connected');
      case "connecting":
        return t('settings.notion.reloadRequired');
      case "error":
        return t('settings.notion.connectionFailed');
      default:
        return t('settings.notion.notConnected');
    }
  };

  const notionStatusStyle = () => {
    if (props.notionStatus === "connected") {
      return "bg-green-7/10 text-green-11 border-green-7/20";
    }
    if (props.notionStatus === "error") {
      return "bg-red-7/10 text-red-11 border-red-7/20";
    }
    if (props.notionStatus === "connecting") {
      return "bg-amber-7/10 text-amber-11 border-amber-7/20";
    }
    return "bg-gray-4/60 text-gray-11 border-gray-7/50";
  };


  return (
    <section class="space-y-6">
      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-3">
        <div class="text-sm font-medium text-gray-12">{t('settings.connection.title')}</div>
        <div class="text-xs text-gray-10">{props.headerStatus}</div>
        <div class="text-xs text-gray-7 font-mono">{props.baseUrl}</div>
        <div class="pt-2 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={props.toggleDeveloperMode}>
            <Shield size={16} />
            {props.developerMode ? t('settings.connection.developerModeDisable') : t('settings.connection.developerMode')}
          </Button>
          <Show when={props.mode === "host"}>
            <Button variant="danger" onClick={props.stopHost} disabled={props.busy}>
              {t('settings.connection.stopEngine')}
            </Button>
          </Show>
          <Show when={props.mode === "client"}>
            <Button variant="outline" onClick={props.stopHost} disabled={props.busy}>
              {t('common.buttons.disconnect')}
            </Button>
          </Show>
        </div>

        <Show when={isTauriRuntime() && props.mode === "host"}>
          <div class="pt-4 border-t border-gray-6/60 space-y-3">
            <div class="text-xs text-gray-10">{t('settings.connection.engineSource')}</div>
            <div class="grid grid-cols-2 gap-2">
              <Button
                variant={props.engineSource === "path" ? "secondary" : "outline"}
                onClick={() => props.setEngineSource("path")}
                disabled={props.busy}
              >
                PATH
              </Button>
              <Button
                variant={props.engineSource === "sidecar" ? "secondary" : "outline"}
                onClick={() => props.setEngineSource("sidecar")}
                disabled={props.busy || props.isWindows}
                title={props.isWindows ? t('settings.connection.sidecarWindows') : ""}
              >
                Sidecar
              </Button>
            </div>
            <div class="text-[11px] text-gray-7">
              {t('settings.connection.engineSourceDescription')}
              <Show when={props.isWindows}>
                <span class="text-gray-10"> {t('settings.connection.sidecarWindows')}</span>
              </Show>
            </div>
          </div>
        </Show>
      </div>


      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-12">{t('settings.model.title')}</div>
          <div class="text-xs text-gray-10">{t('settings.model.description')}</div>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12 truncate">{props.defaultModelLabel}</div>
            <div class="text-xs text-gray-7 font-mono truncate">{props.defaultModelRef}</div>
          </div>
          <Button
            variant="outline"
            class="text-xs h-8 py-0 px-3 shrink-0"
            onClick={props.openDefaultModelPicker}
            disabled={props.busy}
          >
            {t('common.buttons.change')}
          </Button>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12">{t('settings.model.thinking')}</div>
            <div class="text-xs text-gray-7">{t('settings.model.thinkingDescription')}</div>
          </div>
          <Button
            variant="outline"
            class="text-xs h-8 py-0 px-3 shrink-0"
            onClick={props.toggleShowThinking}
            disabled={props.busy}
          >
            {props.showThinking ? t('common.toggles.on') : t('common.toggles.off')}
          </Button>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12">{t('settings.model.variant')}</div>
            <div class="text-xs text-gray-7 font-mono truncate">{props.modelVariantLabel}</div>
          </div>
          <Button
            variant="outline"
            class="text-xs h-8 py-0 px-3 shrink-0"
            onClick={props.editModelVariant}
            disabled={props.busy}
          >
            {t('common.buttons.edit')}
          </Button>
        </div>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-12">{t('settings.appearance.title')}</div>
          <div class="text-xs text-gray-10">{t('settings.appearance.description')}</div>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button
            variant={props.themeMode === "system" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setThemeMode("system")}
            disabled={props.busy}
          >
            {t('settings.appearance.system')}
          </Button>
          <Button
            variant={props.themeMode === "light" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setThemeMode("light")}
            disabled={props.busy}
          >
            {t('settings.appearance.light')}
          </Button>
          <Button
            variant={props.themeMode === "dark" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setThemeMode("dark")}
            disabled={props.busy}
          >
            {t('settings.appearance.dark')}
          </Button>
        </div>

        <div class="text-xs text-gray-7">
          {t('settings.appearance.autoDescription')}
        </div>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-12">{t('settings.language.title')}</div>
          <div class="text-xs text-gray-10">{t('settings.language.description')}</div>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12">{t('settings.language.switchLanguage')}</div>
            <div class="text-xs text-gray-7 font-mono">{locale() === 'en' ? 'English' : '简体中文'}</div>
          </div>
          <div class="flex gap-2">
            <Button
              variant={locale() === 'en' ? 'secondary' : 'outline'}
              class="text-xs h-8 py-0 px-3 shrink-0"
              onClick={() => setLocale('en')}
            >
              English
            </Button>
            <Button
              variant={locale() === 'zh-CN' ? 'secondary' : 'outline'}
              class="text-xs h-8 py-0 px-3 shrink-0"
              onClick={() => setLocale('zh-CN')}
            >
              简体中文
            </Button>
          </div>
        </div>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-12">{t('settings.demo.title')}</div>
          <div class="text-xs text-gray-10">{t('settings.demo.description')}</div>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12">{t('settings.demo.enable')}</div>
            <div class="text-xs text-gray-7">{t('settings.demo.replacesData')}</div>
          </div>
          <Button
            variant={props.demoMode ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3 shrink-0"
            onClick={props.toggleDemoMode}
            disabled={props.busy}
          >
            {props.demoMode ? t('common.toggles.on') : t('common.toggles.off')}
          </Button>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button
            variant={props.demoSequence === "cold-open" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setDemoSequence("cold-open")}
            disabled={props.busy || !props.demoMode}
          >
            {t('settings.demo.sequences.coldOpen')}
          </Button>
          <Button
            variant={props.demoSequence === "scheduler" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setDemoSequence("scheduler")}
            disabled={props.busy || !props.demoMode}
          >
            {t('settings.demo.sequences.scheduler')}
          </Button>
          <Button
            variant={props.demoSequence === "summaries" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setDemoSequence("summaries")}
            disabled={props.busy || !props.demoMode}
          >
            {t('settings.demo.sequences.summaries')}
          </Button>
          <Button
            variant={props.demoSequence === "groceries" ? "secondary" : "outline"}
            class="text-xs h-8 py-0 px-3"
            onClick={() => props.setDemoSequence("groceries")}
            disabled={props.busy || !props.demoMode}
          >
            {t('settings.demo.sequences.groceries')}
          </Button>
        </div>

        <div class="text-xs text-gray-7">
          {t('settings.demo.sequenceDescription')}
        </div>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-3">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-sm font-medium text-gray-12">{t('settings.updates.title')}</div>
            <div class="text-xs text-gray-10">{t('settings.updates.description')}</div>
          </div>
          <div class="text-xs text-gray-7 font-mono">{props.appVersion ? `v${props.appVersion}` : ""}</div>
        </div>

        <Show
          when={!isTauriRuntime()}
          fallback={
            <Show
              when={props.updateEnv && props.updateEnv.supported === false}
              fallback={
                <>
                  <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6">
                    <div class="space-y-0.5">
                      <div class="text-sm text-gray-12">{t('settings.updates.autoCheck')}</div>
                      <div class="text-xs text-gray-7">{t('settings.updates.frequency')}</div>
                    </div>
                    <button
                      class={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${props.updateAutoCheck
                          ? "bg-gray-12/10 text-gray-12 border-gray-6/20"
                          : "text-gray-10 border-gray-6 hover:text-gray-12"
                        }`}
                      onClick={props.toggleUpdateAutoCheck}
                    >
                      {props.updateAutoCheck ? t('common.toggles.on') : t('common.toggles.off')}
                    </button>
                  </div>

                  <div class="flex items-center justify-between gap-3 bg-gray-1 p-3 rounded-xl border border-gray-6">
                    <div class="space-y-0.5">
                      <div class="text-sm text-gray-12">
                        <Switch>
                          <Match when={updateState() === "checking"}>{t('settings.updates.checking')}</Match>
                          <Match when={updateState() === "available"}>{t('settings.updates.available', { version: updateVersion() ?? "" })}</Match>
                          <Match when={updateState() === "downloading"}>{t('settings.updates.downloading')}</Match>
                          <Match when={updateState() === "ready"}>{t('settings.updates.ready', { version: updateVersion() ?? "" })}</Match>
                          <Match when={updateState() === "error"}>{t('settings.updates.error')}</Match>
                          <Match when={true}>{t('settings.updates.upToDate')}</Match>
                        </Switch>
                      </div>
                      <Show when={updateState() === "idle" && updateLastCheckedAt()}>
                        <div class="text-xs text-gray-7">
                          {t('settings.updates.lastChecked', { time: formatRelativeTime(updateLastCheckedAt() as number) })}
                        </div>
                      </Show>
                      <Show when={updateState() === "available" && updateDate()}>
                        <div class="text-xs text-gray-7">{t('settings.updates.published', { date: updateDate() ?? "" })}</div>
                      </Show>
                      <Show when={updateState() === "downloading"}>
                        <div class="text-xs text-gray-7">
                          {formatBytes((updateDownloadedBytes() as number) ?? 0)}
                          <Show when={updateTotalBytes() != null}>
                            {` / ${formatBytes(updateTotalBytes() as number)}`}
                          </Show>
                        </div>
                      </Show>
                      <Show when={updateState() === "error"}>
                        <div class="text-xs text-red-11">{updateErrorMessage()}</div>
                      </Show>
                    </div>

                    <div class="flex items-center gap-2">
                      <Button
                        variant="outline"
                        class="text-xs h-8 py-0 px-3"
                        onClick={props.checkForUpdates}
                        disabled={props.busy || updateState() === "checking" || updateState() === "downloading"}
                      >
                        {t('settings.updates.checkButton')}
                      </Button>

                      <Show when={updateState() === "available"}>
                        <Button
                          variant="secondary"
                          class="text-xs h-8 py-0 px-3"
                          onClick={props.downloadUpdate}
                          disabled={props.busy || updateState() === "downloading"}
                        >
                          {t('settings.updates.downloadButton')}
                        </Button>
                      </Show>

                      <Show when={updateState() === "ready"}>
                        <Button
                          variant="secondary"
                          class="text-xs h-8 py-0 px-3"
                          onClick={props.installUpdateAndRestart}
                          disabled={props.busy || props.anyActiveRuns}
                          title={props.anyActiveRuns ? t('settings.updates.stopRunsHint') : ""}
                        >
                          {t('settings.updates.installButton')}
                        </Button>
                      </Show>
                    </div>
                  </div>

                  <Show when={updateState() === "available" && updateNotes()}>
                    <div class="rounded-xl bg-gray-1/20 border border-gray-6 p-3 text-xs text-gray-11 whitespace-pre-wrap max-h-40 overflow-auto">
                      {updateNotes()}
                    </div>
                  </Show>
                </>
              }
            >
              <div class="rounded-xl bg-gray-1/20 border border-gray-6 p-3 text-sm text-gray-11">
                {props.updateEnv?.reason ?? t('settings.updates.notSupported')}
              </div>
            </Show>
          }
        >
          <div class="rounded-xl bg-gray-1/20 border border-gray-6 p-3 text-sm text-gray-11">
            {t('settings.updates.desktopOnly')}
          </div>
        </Show>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-3">
        <div class="text-sm font-medium text-gray-12">{t('settings.startup.title')}</div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6">
          <div class="flex items-center gap-3">
            <div
              class={`p-2 rounded-lg ${props.mode === "host" ? "bg-indigo-7/10 text-indigo-11" : "bg-green-7/10 text-green-11"
                }`}
            >
              <Show when={props.mode === "host"} fallback={<Smartphone size={18} />}>
                <HardDrive size={18} />
              </Show>
            </div>
            <span class="capitalize text-sm font-medium text-gray-12">{props.mode === 'host' ? t('settings.startup.hostMode') : t('settings.startup.clientMode')}</span>
          </div>
          <Button variant="outline" class="text-xs h-8 py-0 px-3" onClick={props.stopHost} disabled={props.busy}>
            {t('settings.startup.switch')}
          </Button>
        </div>

        <Button variant="secondary" class="w-full justify-between group" onClick={props.onResetStartupPreference}>
          <span class="text-gray-11">{t('settings.startup.reset')}</span>
          <RefreshCcw size={14} class="text-gray-10 group-hover:rotate-180 transition-transform" />
        </Button>

        <p class="text-xs text-gray-7">
          {t('settings.startup.resetDescription')}
        </p>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-12">{t('settings.advanced.title')}</div>
          <div class="text-xs text-gray-10">{t('settings.advanced.description')}</div>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12">{t('settings.advanced.resetOnboarding')}</div>
            <div class="text-xs text-gray-7">{t('settings.advanced.resetOnboardingDescription')}</div>
          </div>
          <Button
            variant="outline"
            class="text-xs h-8 py-0 px-3 shrink-0"
            onClick={() => props.openResetModal("onboarding")}
            disabled={props.busy || props.resetModalBusy || props.anyActiveRuns}
            title={props.anyActiveRuns ? t('settings.advanced.stopRunsHint') : ""}
          >
            {t('settings.advanced.resetButton')}
          </Button>
        </div>

        <div class="flex items-center justify-between bg-gray-1 p-3 rounded-xl border border-gray-6 gap-3">
          <div class="min-w-0">
            <div class="text-sm text-gray-12">{t('settings.advanced.resetAppData')}</div>
            <div class="text-xs text-gray-7">{t('settings.advanced.resetAppDataDescription')}</div>
          </div>
          <Button
            variant="danger"
            class="text-xs h-8 py-0 px-3 shrink-0"
            onClick={() => props.openResetModal("all")}
            disabled={props.busy || props.resetModalBusy || props.anyActiveRuns}
            title={props.anyActiveRuns ? t('settings.advanced.stopRunsHint') : ""}
          >
            {t('settings.advanced.resetButton')}
          </Button>
        </div>

        <div class="text-xs text-gray-7">
          {t('settings.advanced.resetConfirmHint')}
        </div>
      </div>

      <Show when={props.developerMode}>
        <section>
          <h3 class="text-sm font-medium text-gray-11 uppercase tracking-wider mb-4">{t('settings.developer.title')}</h3>

          <div class="space-y-4">
            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="min-w-0">
                <div class="text-sm text-gray-12">{t('settings.developer.cache')}</div>
                <div class="text-xs text-gray-7">
                  {t('settings.developer.cacheDescription')}
                </div>
                <Show when={props.cacheRepairResult}>
                  <div class="text-xs text-gray-11 mt-2">{props.cacheRepairResult}</div>
                </Show>
              </div>
              <Button
                variant="secondary"
                class="text-xs h-8 py-0 px-3 shrink-0"
                onClick={props.repairOpencodeCache}
                disabled={props.cacheRepairBusy || !isTauriRuntime()}
                title={isTauriRuntime() ? "" : t('settings.developer.requiresDesktop')}
              >
                {props.cacheRepairBusy ? t('settings.developer.repairingCache') : t('settings.developer.repairCache')}
              </Button>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-4">
                <div class="text-xs text-gray-10 mb-2">{t('settings.developer.pendingPermissions')}</div>
                <pre class="text-xs text-gray-12 whitespace-pre-wrap break-words max-h-64 overflow-auto">
                  {props.safeStringify(props.pendingPermissions)}
                </pre>
              </div>
              <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-4">
                <div class="text-xs text-gray-10 mb-2">{t('settings.developer.recentEvents')}</div>
                <pre class="text-xs text-gray-12 whitespace-pre-wrap break-words max-h-64 overflow-auto">
                  {props.safeStringify(props.events)}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </Show>
    </section>
  );
}
