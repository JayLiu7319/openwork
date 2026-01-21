import { For, Show } from "solid-js";
import { CheckCircle2, Circle } from "lucide-solid";
import { useI18n, type Locale } from "../../i18n";

/**
 * 语言选项列表
 */
const LANGUAGE_OPTIONS: { value: Locale; label: string; nativeName: string }[] = [
  { value: "en", label: "English", nativeName: "English" },
  { value: "zh-CN", label: "Chinese (Simplified)", nativeName: "简体中文" },
];

export type LanguagePickerModalProps = {
  open: boolean;
  currentLanguage: Locale;
  onSelect: (language: Locale) => void;
  onClose: () => void;
};

export default function LanguagePickerModal(props: LanguagePickerModalProps) {
  const { t } = useI18n();

  return (
    <Show when={props.open}>
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-zinc-900 rounded-2xl p-6 w-full max-w-md border border-zinc-800 shadow-xl">
          <h3 class="text-lg font-medium text-white mb-4">{t("settings.language.title")}</h3>

          <div class="space-y-2">
            <For each={LANGUAGE_OPTIONS}>
              {(option) => (
                <button
                  class={`w-full p-3 rounded-xl text-left transition-all ${props.currentLanguage === option.value
                      ? "bg-zinc-800 text-white border-2 border-zinc-700"
                      : "bg-zinc-950 text-zinc-400 hover:bg-zinc-900 border-2 border-transparent"
                    }`}
                  onClick={() => {
                    props.onSelect(option.value);
                    props.onClose();
                  }}
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex-1">
                      <div class="font-medium text-sm">{option.nativeName}</div>
                      <Show when={option.label !== option.nativeName}>
                        <div class="text-xs text-zinc-500 mt-0.5">{option.label}</div>
                      </Show>
                    </div>
                    <div class="text-zinc-500">
                      <Show
                        when={props.currentLanguage === option.value}
                        fallback={<Circle size={14} />}
                      >
                        <CheckCircle2 size={14} class="text-emerald-400" />
                      </Show>
                    </div>
                  </div>
                </button>
              )}
            </For>
          </div>

          <button
            class="mt-4 w-full py-2 text-sm text-zinc-500 hover:text-white transition-colors"
            onClick={props.onClose}
          >
            {t("common.buttons.cancel")}
          </button>
        </div>
      </div>
    </Show>
  );
}
