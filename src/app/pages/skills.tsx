import { For, Show } from "solid-js";

import type { CuratedPackage, SkillCard } from "../types";
import { isTauriRuntime } from "../utils";
import { useI18n } from "../../i18n";

import Button from "../components/button";
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
        <h3 class="text-sm font-medium text-gray-11 uppercase tracking-wider">{t('skills.title')}</h3>
        <Button variant="secondary" onClick={() => props.refreshSkills({ force: true })} disabled={props.busy}>
          {t('common.buttons.refresh')}
        </Button>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm font-medium text-gray-12">{t('skills.install.title')}</div>
          <Show when={props.mode !== "host"}>
            <div class="text-xs text-gray-10">{t('skills.install.hostOnly')}</div>
          </Show>
        </div>
        <div class="flex flex-col md:flex-row gap-2">
          <input
            class="w-full bg-gray-2/50 border border-gray-6 rounded-xl px-3 py-2 text-sm text-gray-12 placeholder-gray-7 focus:outline-none focus:ring-1 focus:ring-gray-8 focus:border-gray-8 transition-all"
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
        <div class="text-xs text-gray-10">
          {t('skills.install.description')}
        </div>

        <div class="flex items-center justify-between gap-3 pt-2 border-t border-gray-6/60">
          <div class="text-sm font-medium text-gray-12">{t('skills.import.title')}</div>
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
          <div class="rounded-xl bg-gray-1/20 border border-gray-6 p-3 text-xs text-gray-11 whitespace-pre-wrap break-words">
            {props.skillsStatus}
          </div>
        </Show>
      </div>

      <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-12">{t('skills.curated.title')}</div>
          <div class="text-xs text-gray-10">{props.filteredPackages.length}</div>
        </div>

        <div class="rounded-2xl border border-green-7/20 bg-green-7/10 p-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-sm font-medium text-green-12">{t('skills.curated.notion.title')}</div>
              <div class="text-xs text-green-12/80 mt-1">{t('skills.curated.notion.description')}</div>
            </div>
            <Button
              variant="secondary"
              onClick={() => props.useCuratedPackage({
                name: t('skills.curated.notion.title'),
                source: "https://github.com/different-ai/notion-crm-enrichment/tree/main/.claude/skills",
                description: t('skills.curated.notion.description'),
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
          class="w-full bg-gray-2/50 border border-gray-6 rounded-xl px-3 py-2 text-sm text-gray-12 placeholder-gray-7 focus:outline-none focus:ring-1 focus:ring-gray-8 focus:border-gray-8 transition-all"
          placeholder={t('skills.curated.searchPlaceholder')}
          value={props.packageSearch}
          onInput={(e) => props.setPackageSearch(e.currentTarget.value)}
        />

        <Show
          when={props.filteredPackages.length}
          fallback={
            <div class="rounded-xl bg-gray-1/20 border border-gray-6 p-3 text-xs text-gray-11">
              {t('skills.curated.noMatches')}
            </div>
          }
        >
          <div class="space-y-3">
            <For each={props.filteredPackages}>
              {(pkg) => (
                <div class="rounded-xl border border-gray-6/70 bg-gray-1/40 p-4">
                  <div class="flex items-start justify-between gap-4">
                    <div class="space-y-2">
                      <div class="text-sm font-medium text-gray-12">{pkg.name}</div>
                      <div class="text-xs text-gray-10 font-mono break-all">{pkg.source}</div>
                      <div class="text-sm text-gray-10">{pkg.description}</div>
                      <div class="flex flex-wrap gap-2">
                        <For each={pkg.tags}>
                          {(tag) => (
                            <span class="text-[10px] uppercase tracking-wide bg-gray-4/70 text-gray-11 px-2 py-0.5 rounded-full">
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

        <div class="text-xs text-gray-10">
          {t('skills.curated.registryNote')}
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm font-medium text-gray-12">{t('skills.list.title')}</div>
          <div class="text-xs text-gray-10">{props.skills.length}</div>
        </div>

        <Show
          when={props.skills.length}
          fallback={
            <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-6 text-sm text-gray-10">
              {t('skills.list.empty')}
            </div>
          }
        >
          <div class="grid gap-3">
            <For each={props.skills}>
              {(s) => (
                <div class="bg-gray-2/30 border border-gray-6/50 rounded-2xl p-5">
                  <div class="flex items-center gap-2">
                    <Package size={16} class="text-gray-11" />
                    <div class="font-medium text-gray-12">{s.name}</div>
                  </div>
                  <Show when={s.description}>
                    <div class="mt-1 text-sm text-gray-10">{s.description}</div>
                  </Show>
                  <div class="mt-2 text-xs text-gray-7 font-mono">{s.path}</div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </section>
  );
}
