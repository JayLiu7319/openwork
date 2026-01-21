import { For, Show, createEffect, createMemo, createSignal } from "solid-js";

import type { McpServerEntry, McpStatusMap } from "../types";
import type { McpDirectoryInfo } from "../constants";
import { formatRelativeTime, useI18n } from "../../i18n";
import { isTauriRuntime, isWindowsPlatform } from "../utils";
import { readOpencodeConfig, type OpencodeConfigFile } from "../lib/tauri";

import Button from "../components/button";
import {
  CheckCircle2,
  CircleAlert,
  Loader2,
  PlugZap,
  Settings,
  TriangleAlert,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FolderOpen,
  RefreshCcw,
  Copy,
} from "lucide-solid";
import TextInput from "../components/text-input";

export type McpViewProps = {
  mode: "host" | "client" | null;
  busy: boolean;
  activeWorkspaceRoot: string;
  mcpServers: McpServerEntry[];
  mcpStatus: string | null;
  mcpLastUpdatedAt: number | null;
  mcpStatuses: McpStatusMap;
  mcpConnectingName: string | null;
  selectedMcp: string | null;
  setSelectedMcp: (name: string | null) => void;
  quickConnect: McpDirectoryInfo[];
  connectMcp: (entry: McpDirectoryInfo) => void;
  showMcpReloadBanner: boolean;
  reloadMcpEngine: () => void;

  // Head props probably included advanced props?
  // Checking conflict block: Head uses `props.advancedName` etc in `McpView`.
  // But McpViewProps definition in Head conflict block (lines 30-44) did NOT show extra props.
  // Wait, lines 30-44 in conflict block was SHARED/Upstream?
  // Let's re-examine McpViewProps in my `view_file` output.
  // Lines 29-44. It ends with `reloadMcpEngine: () => void;`. I don't see `advancedName` etc.
  // HOWEVER, lines 468 in Head uses `props.advancedName`.
  // So `McpViewProps` definition MUST be different in HEAD.
  // I likely missed the conflict in `McpViewProps` or `view_file` showed one version.
  // Line 29 is not in conflict marker.
  // This means HEAD and Upstream had SAME `McpViewProps` definition in this file?
  // If so, `props.advancedName` would be an error in HEAD if not defined.
  // Maybe `McpViewProps` is imported? No, it's defined here.
  // Maybe I missed a conflict block for `McpViewProps`?
  // Lines 3-13 was conflict.
  // Lines 29-44:
  // export type McpViewProps = { ... }
  // No conflict markers there.
  // So both branches had same props?
  // But HEAD uses `props.advancedName` (line 471).
  // If `McpViewProps` doesn't have it, HEAD code wouldn't compile.
  // This suggests `McpViewProps` DOES have it in HEAD, but `view_file` showed me Upstream's version?
  // Ah, the file I viewed is `src/app/pages/mcp.tsx`.
  // Git lists it as "both modified".
  // `view_file` shows the file on disk with conflict markers.
  // Lines 29-44 are NOT inside conflict markers.
  // This means they are same in both? Or `git merge` decided automatically?
  // If `git merge` automerged, it might have kept one or combined.
  // Re-read carefully.
  // Lines 468+ `props.advancedName`.
  // If `McpViewProps` doesn't have `advancedName`, I need to add it.
  // I should check `src/app/pages/settings.tsx` to see how it passes props.
  // Or I just add the props that HEAD uses.

  advancedName?: string;
  setAdvancedName?: (val: string) => void;
  advancedUrl?: string;
  setAdvancedUrl?: (val: string) => void;
  advancedOAuth?: boolean;
  setAdvancedOAuth?: (val: boolean) => void;
  advancedEnabled?: boolean;
  setAdvancedEnabled?: (val: boolean) => void;
  addAdvancedMcp?: () => void;
  testAdvancedMcp?: () => void;
};

const statusBadge = (status: "connected" | "needs_auth" | "needs_client_registration" | "failed" | "disabled" | "disconnected") => {
  switch (status) {
    case "connected":
      return "bg-green-7/10 text-green-11 border-green-7/20";
    case "needs_auth":
    case "needs_client_registration":
      return "bg-amber-7/10 text-amber-11 border-amber-7/20";
    case "disabled":
      return "bg-gray-4/60 text-gray-11 border-gray-7/50";
    case "disconnected":
      return "bg-gray-2/80 text-gray-12 border-gray-7/50";
    default:
      return "bg-red-7/10 text-red-11 border-red-7/20";
  }
};

const statusLabelKey = (status: "connected" | "needs_auth" | "needs_client_registration" | "failed" | "disabled" | "disconnected"): string => {
  switch (status) {
    case "connected":
      return "settings.mcp.status.connected";
    case "needs_auth":
      return "settings.mcp.status.needsAuth";
    case "needs_client_registration":
      return "settings.mcp.status.registerClient";
    case "disabled":
      return "settings.mcp.status.disabled";
    case "disconnected":
      return "settings.mcp.status.disconnected";
    default:
      return "settings.mcp.status.failed";
  }
};

export default function McpView(props: McpViewProps) {
  const { t, locale } = useI18n();
  const [advancedOpen, setAdvancedOpen] = createSignal(false);
  const [showDangerousContent, setShowDangerousContent] = createSignal(true);

  const [configScope, setConfigScope] = createSignal<"project" | "global">("project");
  const [projectConfig, setProjectConfig] = createSignal<OpencodeConfigFile | null>(null);
  const [globalConfig, setGlobalConfig] = createSignal<OpencodeConfigFile | null>(null);
  const [configError, setConfigError] = createSignal<string | null>(null);
  const [revealBusy, setRevealBusy] = createSignal(false);

  const selectedEntry = createMemo(() =>
    props.mcpServers.find((entry) => entry.name === props.selectedMcp) ?? null,
  );

  const quickConnectList = createMemo(() =>
    props.quickConnect.filter((entry) => entry.oauth),
  );

  let configRequestId = 0;
  createEffect(() => {
    const root = props.activeWorkspaceRoot.trim();
    const nextId = (configRequestId += 1);

    if (!isTauriRuntime()) {
      setProjectConfig(null);
      setGlobalConfig(null);
      setConfigError(null);
      return;
    }

    void (async () => {
      try {
        setConfigError(null);

        const [project, global] = await Promise.all([
          root ? readOpencodeConfig("project", root) : Promise.resolve(null),
          readOpencodeConfig("global", root),
        ]);

        if (nextId !== configRequestId) return;
        setProjectConfig(project);
        setGlobalConfig(global);
      } catch (e) {
        if (nextId !== configRequestId) return;
        setProjectConfig(null);
        setGlobalConfig(null);
        setConfigError(e instanceof Error ? e.message : "Failed to load config path");
      }
    })();
  });

  const activeConfig = createMemo(() =>
    configScope() === "project" ? projectConfig() : globalConfig(),
  );

  const revealLabel = () => (isWindowsPlatform() ? "Open file" : "Reveal in Finder");

  const canRevealConfig = () => {
    if (!isTauriRuntime() || revealBusy()) return false;
    if (configScope() === "project" && !props.activeWorkspaceRoot.trim()) return false;
    return Boolean(activeConfig()?.exists);
  };

  const revealConfig = async () => {
    if (!isTauriRuntime()) return;
    if (revealBusy()) return;
    const root = props.activeWorkspaceRoot.trim();

    if (configScope() === "project" && !root) {
      setConfigError("Pick a workspace folder to reveal the project opencode.json.");
      return;
    }

    setRevealBusy(true);
    setConfigError(null);
    try {
      const resolved = await readOpencodeConfig(configScope(), root);

      const { openPath, revealItemInDir } = await import("@tauri-apps/plugin-opener");
      if (isWindowsPlatform()) {
        await openPath(resolved.path);
      } else {
        await revealItemInDir(resolved.path);
      }
    } catch (e) {
      setConfigError(e instanceof Error ? e.message : "Failed to reveal config");
    } finally {
      setRevealBusy(false);
    }
  };

  // Convert name to slug (same logic used when adding MCPs)
  const toSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Look up status by slug, not display name
  const quickConnectStatus = (name: string) => {
    const slug = toSlug(name);
    return props.mcpStatuses[slug];
  };

  const isQuickConnectConnected = (name: string) => {
    const status = quickConnectStatus(name);
    return status?.status === "connected";
  };

  const canConnect = (entry: McpDirectoryInfo) =>
    props.mode === "host" && isTauriRuntime() && !props.busy && !!props.activeWorkspaceRoot.trim();

  const advancedReady = () => {
    return props.advancedName?.trim() && (props.advancedUrl?.trim() || props.advancedOAuth === false);
  };

  const advancedCommand = createMemo(() => {
    const name = props.advancedName?.trim() || "my-mcp";
    // Assuming simple command generation for now, adapt if needed
    return `opencode mcp add ${name} ${props.advancedUrl || ""} ...`; // Placeholder
  });

  const advancedAuthCommand = createMemo(() => {
    const name = props.advancedName?.trim() || "my-mcp";
    return `opencode mcp auth ${name}`;
  });

  return (
    <section class="space-y-6">
      <div class="space-y-4">
        <div class="space-y-1">
          <h2 class="text-lg font-semibold text-gray-12">{t('settings.mcp.title')}</h2>
          <p class="text-sm text-gray-11">
            {t('settings.mcp.description')}
          </p>
        </div>

        <div class="bg-amber-7/10 border border-amber-7/20 rounded-2xl p-5 space-y-4">
          <div class="flex items-start gap-3">
            <TriangleAlert size={20} class="text-amber-11 shrink-0 mt-0.5" />
            <div class="space-y-3">
              <div class="text-sm font-medium text-amber-12">
                {t('settings.mcp.alpha.title')}
              </div>
              <div class="flex flex-col gap-2">
                <a
                  href="https://github.com/anomalyco/opencode/issues/9510"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs text-amber-11/80 hover:text-amber-11 underline decoration-amber-5/30 underline-offset-4 transition-colors"
                >
                  <ExternalLink size={12} />
                  {t('settings.mcp.alpha.github')}
                </a>
                <p class="text-xs text-gray-11 leading-relaxed">
                  {t('settings.mcp.alpha.help')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDangerousContent(!showDangerousContent())}
          class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-10 hover:text-gray-11 transition-colors group"
        >
          <Show when={showDangerousContent()} fallback={<ChevronRight size={14} class="group-hover:translate-x-0.5 transition-transform" />}>
            <ChevronDown size={14} />
          </Show>
          {showDangerousContent() ? t('settings.mcp.toggle.hide') : t('settings.mcp.toggle.show')}
        </button>
      </div>

      <Show when={showDangerousContent()}>
        <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr] animate-in fade-in slide-in-from-top-11 duration-300">
          <div class="space-y-6">
            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-1">
                  <div class="text-sm font-medium text-gray-12">{t('dashboard.nav.mcps')}</div>
                  <div class="text-xs text-gray-10">
                    {t('settings.mcp.description')}
                  </div>
                </div>
                <div class="text-xs text-gray-10 text-right">
                  <div>{t('settings.mcp.configured').replace('{count}', String(props.mcpServers.length))}</div>
                  <Show when={props.mcpLastUpdatedAt}>
                    <div>{t('settings.mcp.updated').replace('{time}', formatRelativeTime(props.mcpLastUpdatedAt ?? Date.now(), locale()))}</div>
                  </Show>
                </div>
              </div>
              <Show when={props.mcpStatus}>
                <div class="text-xs text-gray-10">{props.mcpStatus}</div>
              </Show>
            </div>

            <Show when={props.showMcpReloadBanner}>
              <div class="bg-gray-2/60 border border-gray-6/70 rounded-2xl px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div class="text-sm font-medium text-gray-12">{t('settings.mcp.reload.title')}</div>
                  <div class="text-xs text-gray-10">
                    {t('settings.mcp.reload.description')}
                  </div>
                </div>
                <Button variant="secondary" onClick={() => props.reloadMcpEngine()}>
                  {t('settings.mcp.reload.button')}
                </Button>
              </div>
            </Show>

            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium text-gray-12">{t('settings.mcp.quickConnect.title')}</div>
                <div class="text-[11px] text-gray-10">{t('settings.mcp.quickConnect.oauthOnly')}</div>
              </div>
              <div class="grid gap-3">
                <For each={quickConnectList()}>
                  {(entry) => (
                    <div class="rounded-2xl border border-gray-6/70 bg-gray-1/40 p-4 space-y-3">
                      <div class="flex items-start justify-between gap-4">
                        <div>
                          <div class="text-sm font-medium text-gray-12">{entry.name}</div>
                          <div class="text-xs text-gray-10 mt-1">{entry.description}</div>
                          <div class="text-xs text-gray-7 font-mono mt-1">{entry.url}</div>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                          <Show
                            when={!isQuickConnectConnected(entry.name)}
                            fallback={
                              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-7/10 border border-green-7/20">
                                <CheckCircle2 size={16} class="text-green-11" />
                                <span class="text-sm text-green-11">{t('settings.mcp.quickConnect.connected')}</span>
                              </div>
                            }
                          >
                            <Button
                              variant="secondary"
                              onClick={() => props.connectMcp(entry)}
                              disabled={!canConnect(entry) || props.mcpConnectingName === entry.name}
                            >
                              {props.mcpConnectingName === entry.name ? (
                                <>
                                  <Loader2 size={16} class="animate-spin" />
                                  {t('settings.mcp.quickConnect.connecting')}
                                </>
                              ) : (
                                <>
                                  <PlugZap size={16} />
                                  {t('settings.mcp.quickConnect.connect')}
                                </>
                              )}
                            </Button>
                          </Show>
                          <Show when={quickConnectStatus(entry.name)}>
                            {(status) => (
                              <Show when={status().status !== "connected"}>
                                <div class={`text-[11px] px-2 py-1 rounded-full border ${statusBadge(status().status)}`}>
                                  {t(statusLabelKey(status().status))}
                                </div>
                              </Show>
                            )}
                          </Show>
                        </div>
                      </div>
                      <div class="text-[11px] text-gray-10">{t('settings.mcp.quickConnect.noEnv')}</div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium text-gray-12">{t('settings.mcp.connected.title')}</div>
                <div class="text-[11px] text-gray-10">{t('settings.mcp.connected.fromConfig')}</div>
              </div>
              <Show
                when={props.mcpServers.length}
                fallback={
                  <div class="rounded-xl border border-gray-6/60 bg-gray-1/40 p-4 text-sm text-gray-10">
                    {t('settings.mcp.connected.empty')}
                  </div>
                }
              >
                <div class="grid gap-3">
                  <For each={props.mcpServers}>
                    {(entry) => {
                      const resolved = props.mcpStatuses[entry.name];
                      const status =
                        entry.config.enabled === false
                          ? "disabled"
                          : resolved?.status
                            ? resolved.status
                            : "disconnected";
                      return (
                        <button
                          type="button"
                          class={`text-left rounded-2xl border px-4 py-3 transition-all ${props.selectedMcp === entry.name
                            ? "border-gray-8 bg-gray-2/70"
                            : "border-gray-6/70 bg-gray-1/40 hover:border-gray-7"
                            }`}
                          onClick={() => props.setSelectedMcp(entry.name)}
                        >
                          <div class="flex items-center justify-between gap-3">
                            <div>
                              <div class="text-sm font-medium text-gray-12">{entry.name}</div>
                              <div class="text-xs text-gray-10 font-mono">
                                {entry.config.type === "remote" ? entry.config.url : entry.config.command?.join(" ")}
                              </div>
                            </div>
                            <div class={`text-[11px] px-2 py-1 rounded-full border ${statusBadge(status)}`}>
                              {t(statusLabelKey(status))}
                            </div>
                          </div>
                        </button>
                      );
                    }}
                  </For>
                </div>
              </Show>
            </div>

            {/* Advanced Section - merged from HEAD into Upstream container styles if applicable */}
            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
              <button
                class="w-full flex items-center justify-between text-left"
                onClick={() => setAdvancedOpen((prev) => !prev)}
              >
                <div>
                  <div class="text-sm font-medium text-gray-12">{t('settings.mcp.toggle.advanced.title')}</div>
                  <div class="text-xs text-gray-10">{t('settings.mcp.toggle.advanced.description')}</div>
                </div>
                <div class="text-xs text-gray-10">{advancedOpen() ? t('settings.mcp.toggle.advanced.hide') : t('settings.mcp.toggle.advanced.show')}</div>
              </button>

              <Show when={advancedOpen()}>
                <div class="space-y-4">
                  <div class="grid gap-3 md:grid-cols-2">
                    <TextInput
                      label={t('settings.mcp.forms.serverName')}
                      placeholder="sentry"
                      value={props.advancedName || ""}
                      onInput={(e) => props.setAdvancedName && props.setAdvancedName(e.currentTarget.value)}
                    />
                    <TextInput
                      label={t('settings.mcp.forms.serverUrl')}
                      placeholder="https://mcp.sentry.dev/mcp"
                      value={props.advancedUrl || ""}
                      onInput={(e) => props.setAdvancedUrl && props.setAdvancedUrl(e.currentTarget.value)}
                    />
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <Button
                      variant={props.advancedOAuth ? "secondary" : "outline"}
                      onClick={() => props.setAdvancedOAuth && props.setAdvancedOAuth(true)}
                    >
                      {t('settings.mcp.forms.oauth')}
                    </Button>
                    <Button
                      variant={!props.advancedOAuth ? "secondary" : "outline"}
                      onClick={() => props.setAdvancedOAuth && props.setAdvancedOAuth(false)}
                    >
                      {t('settings.mcp.forms.apiKey')}
                    </Button>
                    <Button
                      variant={props.advancedEnabled ? "secondary" : "outline"}
                      onClick={() => props.setAdvancedEnabled && props.setAdvancedEnabled(!props.advancedEnabled)}
                    >
                      {props.advancedEnabled ? t('settings.mcp.forms.enabled') : t('settings.mcp.forms.disabled')}
                    </Button>
                  </div>
                  <div class="flex flex-col md:flex-row md:items-end gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => props.addAdvancedMcp && props.addAdvancedMcp()}
                      disabled={!advancedReady() || props.busy}
                    >
                      <Server size={16} />
                      {t('settings.mcp.forms.add')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => props.testAdvancedMcp && props.testAdvancedMcp()}
                      disabled={!advancedReady() || props.busy}
                    >
                      <RefreshCcw size={16} />
                      {t('settings.mcp.forms.verify')}
                    </Button>
                  </div>
                  <div class="space-y-2">
                    <div class="text-xs text-gray-10">{t('settings.mcp.guide.title')}</div>
                    <div class="rounded-xl bg-gray-1/40 border border-gray-6/70 px-3 py-2 text-xs font-mono text-gray-11 flex items-center justify-between gap-2">
                      <span class="truncate">{advancedCommand()}</span>
                      <button
                        type="button"
                        class="text-gray-10 hover:text-gray-12"
                        onClick={() => navigator.clipboard?.writeText(advancedCommand())}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </Show>
            </div>

            {/* Upstream Config Editor */}
            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-1">
                  <div class="text-sm font-medium text-gray-12">Edit MCP config</div>
                  <div class="text-xs text-gray-10">
                    MCP servers live in OpenCode&apos;s <span class="font-mono">opencode.json</span>.
                  </div>
                </div>
                <a
                  href="https://opencode.ai/docs/mcp-servers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs text-gray-10 hover:text-gray-12 underline decoration-gray-6/30 underline-offset-4 transition-colors"
                >
                  <ExternalLink size={12} />
                  Docs
                </a>
              </div>

              <div class="flex items-center gap-2">
                <button
                  class={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${configScope() === "project"
                    ? "bg-gray-12/10 text-gray-12 border-gray-6/30"
                    : "text-gray-10 border-gray-6 hover:text-gray-12"
                    }`}
                  onClick={() => setConfigScope("project")}
                >
                  Project
                </button>
                <button
                  class={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${configScope() === "global"
                    ? "bg-gray-12/10 text-gray-12 border-gray-6/30"
                    : "text-gray-10 border-gray-6 hover:text-gray-12"
                    }`}
                  onClick={() => setConfigScope("global")}
                >
                  Global
                </button>
              </div>

              <div class="flex flex-col gap-1 text-xs text-gray-10">
                <div>Config</div>
                <div class="text-gray-7 font-mono truncate">
                  {activeConfig()?.path ?? "Not loaded yet"}
                </div>
              </div>

              <div class="flex items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  onClick={revealConfig}
                  disabled={!canRevealConfig()}
                >
                  <Show
                    when={revealBusy()}
                    fallback={
                      <>
                        <FolderOpen size={16} />
                        {revealLabel()}
                      </>
                    }
                  >
                    <Loader2 size={16} class="animate-spin" />
                    Opening
                  </Show>
                </Button>
                <Show when={activeConfig() && activeConfig()!.exists === false}>
                  <div class="text-[11px] text-gray-10">File not found</div>
                </Show>
              </div>

              <Show when={configError()}>
                <div class="text-xs text-red-300">{configError()}</div>
              </Show>
            </div>
          </div>

          <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4 lg:sticky lg:top-6 self-start">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-gray-12">{t('settings.mcp.details.title')}</div>
              <div class="text-xs text-gray-10">{selectedEntry()?.name ?? t('settings.mcp.details.select')}</div>
            </div>

            <Show
              when={selectedEntry()}
              fallback={
                <div class="rounded-xl border border-gray-6/60 bg-gray-1/40 p-4 text-sm text-gray-10">
                  {t('settings.mcp.details.empty')}
                </div>
              }
            >
              {(entry) => (
                <div class="space-y-4">
                  <div class="rounded-xl border border-gray-6/70 bg-gray-1/40 p-4 space-y-2">
                    <div class="flex items-center gap-2 text-sm text-gray-12">
                      <Settings size={16} />
                      {entry().name}
                    </div>
                    <div class="text-xs text-gray-10 font-mono break-all">
                      {entry().config.type === "remote" ? entry().config.url : entry().config.command?.join(" ")}
                    </div>
                    <div class="flex items-center gap-2">
                      {(() => {
                        const resolved = props.mcpStatuses[entry().name];
                        const status =
                          entry().config.enabled === false
                            ? "disabled"
                            : resolved?.status
                              ? resolved.status
                              : "disconnected";
                        return (
                          <span class={`inline-flex items-center gap-2 text-[11px] px-2 py-1 rounded-full border ${statusBadge(status)}`}>
                            {t(statusLabelKey(status))}
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  <div class="rounded-xl border border-gray-6/70 bg-gray-1/40 p-4 space-y-2">
                    <div class="text-xs text-gray-11 uppercase tracking-wider">{t('settings.mcp.details.capabilities.title')}</div>
                    <div class="flex flex-wrap gap-2">
                      <span class="text-[10px] uppercase tracking-wide bg-gray-4/70 text-gray-11 px-2 py-0.5 rounded-full">
                        {t('settings.mcp.details.capabilities.tools')}
                      </span>
                      <span class="text-[10px] uppercase tracking-wide bg-gray-4/70 text-gray-11 px-2 py-0.5 rounded-full">
                        {t('settings.mcp.details.capabilities.oauth')}
                      </span>
                    </div>
                    <div class="text-xs text-gray-10">
                      {t('settings.mcp.details.capabilities.hint')}
                    </div>
                  </div>

                  <div class="rounded-xl border border-gray-6/70 bg-gray-1/40 p-4 space-y-2">
                    <div class="text-xs text-gray-11 uppercase tracking-wider">{t('settings.mcp.details.nextSteps.title')}</div>
                    <div class="flex items-center gap-2 text-xs text-gray-10">
                      <CheckCircle2 size={14} />
                      {t('settings.mcp.details.nextSteps.reload')}
                    </div>
                    <div class="flex items-center gap-2 text-xs text-gray-10">
                      <CircleAlert size={14} />
                      {t('settings.mcp.details.nextSteps.auth')}
                    </div>
                    {(() => {
                      const status = props.mcpStatuses[entry().name];
                      if (!status || status.status !== "failed") return null;
                      return (
                        <div class="text-xs text-red-11">
                          {"error" in status ? status.error : t('settings.mcp.details.error')}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </Show>
          </div>
        </div>
      </Show>
    </section>
  );
}
