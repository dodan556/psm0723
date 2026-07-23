import { useEffect, useState } from "react";

import FormSection from "../../components/ui/FormSection";
import SaveBar from "../../components/ui/SaveBar";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";

import {
  getHomeSettings,
  updateHomeSettings,
} from "../../services/home.service";

import type { HomeSettings } from "../../types/home";

export default function AdminHome() {
  const [form, setForm] = useState<HomeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
  try {
    const data = await getHomeSettings();

    console.log("받은 데이터:", data);

    setForm(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  async function handleSave() {
    if (!form) return;

    try {
      setSaving(true);

      await updateHomeSettings(form);

      alert("저장되었습니다.");
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof HomeSettings>(
    key: K,
    value: HomeSettings[K]
  ) {
    if (!form) return;

    setForm({
      ...form,
      [key]: value,
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log("render", {
  loading,
  form,
});
  if (!form) {
    return <p>데이터가 없습니다.</p>;
  }
console.log("return form =", form);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Home Settings
      </h1>

      <FormSection
        title="Hero"
        description="메인 화면 내용을 수정합니다."
      >
        <Input
          label="제목"
          value={form.title}
          onChange={(e) =>
            updateField("title", e.target.value)
          }
        />

        <Input
          label="부제목"
          value={form.hero_subtitle ?? ""}
          onChange={(e) =>
            updateField("hero_subtitle", e.target.value)
          }
        />

        <Textarea
          label="설명"
          value={form.hero_description ?? ""}
          onChange={(e) =>
            updateField(
              "hero_description",
              e.target.value
            )
          }
        />
      </FormSection>

      <FormSection
        title="Buttons"
        description="버튼 문구와 링크"
      >
        <Input
          label="메인 버튼"
          value={form.primary_button_text ?? ""}
          onChange={(e) =>
            updateField(
              "primary_button_text",
              e.target.value
            )
          }
        />

        <Input
          label="메인 버튼 링크"
          value={form.primary_button_link ?? ""}
          onChange={(e) =>
            updateField(
              "primary_button_link",
              e.target.value
            )
          }
        />

        <Input
          label="보조 버튼"
          value={form.secondary_button_text ?? ""}
          onChange={(e) =>
            updateField(
              "secondary_button_text",
              e.target.value
            )
          }
        />

        <Input
          label="보조 버튼 링크"
          value={form.secondary_button_link ?? ""}
          onChange={(e) =>
            updateField(
              "secondary_button_link",
              e.target.value
            )
          }
        />
      </FormSection>

      <FormSection
        title="Statistics"
        description="홈페이지 통계"
      >
        <Input
          type="number"
          label="Projects"
          value={String(form.stat_projects)}
          onChange={(e) =>
            updateField(
              "stat_projects",
              Number(e.target.value)
            )
          }
        />

        <Input
          type="number"
          label="Clients"
          value={String(form.stat_clients)}
          onChange={(e) =>
            updateField(
              "stat_clients",
              Number(e.target.value)
            )
          }
        />

        <Input
          type="number"
          label="Years"
          value={String(form.stat_years)}
          onChange={(e) =>
            updateField(
              "stat_years",
              Number(e.target.value)
            )
          }
        />
      </FormSection>

      <SaveBar
        loading={saving}
        onSave={handleSave}
      />
    </div>
  );
}