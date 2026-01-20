import { For, Show } from "solid-js";

import type { CuratedPackage, SkillCard } from "../app/types";
import { isTauriRuntime } from "../app/utils";
import { useI18n } from "../i18n";

import Button from "../components/Button";
import { Package, Upload } from "lucide-solid";

export type SkillsViewProps = {
  busy: boolean;
  mode: "host" | "client" | null;
  refreshSkills: (options?: { force?: boolean }) => void;
  skills: SkillCard[];
  skillsStatus: string | null;
  openPackageSource: string;
  setOpenPackageSource: (value: string) => void;
  installFromOpenPackage: () => void;
  importLocalSkill: () => void;
  packageSearch: string;
  setPackageSearch: (value: string) => void;
  filteredPackages: CuratedPackage[];
  useCuratedPackage: (pkg: CuratedPackage) => void;
};

export default function SkillsView(props: SkillsViewProps) {
  const { t } = useI18n();

  return (
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-zinc-400 uppercase tracking-wider">{t('skills.title')}</h3>
        <Button variant="secondary" onClick={() => props.refreshSkills({ force: true })} disabled={props.busy}>
          {t('common.buttons.refresh')}
        </Button>
      </div>

      <div class="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm font-medium text-white">{t('skills.install.title')}</div>
          <Show when={props.mode !== "host"}>
            <div class="text-xs text-zinc-500">{t('skills.install.hostOnly')}</div>
          </Show>
        </div>
        <div class="flex flex-col md:flex-row gap-2">
          <input
            class="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all"
            placeholder={t('skills.install.placeholder')}
            value={props.openPackageSource}
            onInput={(e) => props.setOpenPackageSource(e.currentTarget.value)}
          />
          <Button
            onClick={props.installFromOpenPackage}
            disabled={props.busy || props.mode !== "host" || !isTauriRuntime()}
            class="md:w-auto"
          >
            <Package size={16} />
            {t('skills.install.button')}
          </Button>
        </div>
        <div class="text-xs text-zinc-500">
          {t('skills.install.description')}
        </div>

        <div class="flex items-center justify-between gap-3 pt-2 border-t border-zinc-800/60">
          <div class="text-sm font-medium text-white">{t('skills.import.title')}</div>
          <Button
            variant="secondary"
            onClick={props.importLocalSkill}
            disabled={props.busy || props.mode !== "host" || !isTauriRuntime()}
          >
            <Upload size={16} />
            {t('skills.import.button')}
          </Button>
        </div>

        <Show when={props.skillsStatus}>
          <div class="rounded-xl bg-black/20 border border-zinc-800 p-3 text-xs text-zinc-300 whitespace-pre-wrap break-words">
            {props.skillsStatus}
          </div>
        </Show>
      </div>

      <div class="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-white">{t('skills.curated.title')}</div>
          <div class="text-xs text-zinc-500">{props.filteredPackages.length}</div>
        </div>

        <div class="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-sm font-medium text-emerald-100">{t('skills.curated.notion.title')}</div>
              <div class="text-xs text-emerald-200/80 mt-1">{t('skills.curated.notion.description')}</div>
            </div>
            <Button
              variant="secondary"
              onClick={() => props.useCuratedPackage({
                name: "Notion CRM Enrichment Skills",
                source: "https://github.com/different-ai/notion-crm-enrichment/tree/main/.claude/skills",
                description: "Enrich Notion CRM data with ready-made skills.",
                tags: ["notion", "crm", "skills"],
                installable: false,
              })}
              disabled={props.busy}
            >
              {t('common.actions.viewAll')}
            </Button>
          </div>
        </div>

        <input
          class="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all"
          placeholder={t('skills.curated.searchPlaceholder')}
          value={props.packageSearch}
          onInput={(e) => props.setPackageSearch(e.currentTarget.value)}
        />

        <Show
          when={props.filteredPackages.length}
          fallback={
            <div class="rounded-xl bg-black/20 border border-zinc-800 p-3 text-xs text-zinc-400">
              {t('skills.curated.noMatches')}
            </div>
          }
        >
          <div class="space-y-3">
            <For each={props.filteredPackages}>
              {(pkg) => (
                <div class="rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-4">
                  <div class="flex items-start justify-between gap-4">
                    <div class="space-y-2">
                      <div class="text-sm font-medium text-white">{pkg.name}</div>
                      <div class="text-xs text-zinc-500 font-mono break-all">{pkg.source}</div>
                      <div class="text-sm text-zinc-500">{pkg.description}</div>
                      <div class="flex flex-wrap gap-2">
                        <For each={pkg.tags}>
                          {(tag) => (
                            <span class="text-[10px] uppercase tracking-wide bg-zinc-800/70 text-zinc-400 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>
                    <Button
                      variant={pkg.installable ? "secondary" : "outline"}
                      onClick={() => props.useCuratedPackage(pkg)}
                      disabled={props.busy || (pkg.installable && (props.mode !== "host" || !isTauriRuntime()))}
                    >
                      {pkg.installable ? t('common.buttons.install') : t('common.actions.viewAll')}
                    </Button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <div class="text-xs text-zinc-500">
          {t('skills.curated.registryNote')}
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm font-medium text-white">{t('skills.list.title')}</div>
          <div class="text-xs text-zinc-500">{props.skills.length}</div>
        </div>

        <Show
          when={props.skills.length}
          fallback={
            <div class="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 text-sm text-zinc-500">
              {t('skills.list.empty')}
            </div>
          }
        >
          <div class="grid gap-3">
            <For each={props.skills}>
              {(s) => (
                <div class="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5">
                  <div class="flex items-center gap-2">
                    <Package size={16} class="text-zinc-400" />
                    <div class="font-medium text-white">{s.name}</div>
                  </div>
                  <Show when={s.description}>
                    <div class="mt-1 text-sm text-zinc-500">{s.description}</div>
                  </Show>
                  <div class="mt-2 text-xs text-zinc-600 font-mono">{s.path}</div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </section>
  );
}
