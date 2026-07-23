import { useEffect, useState } from "react";

import FormSection from "../../components/ui/FormSection";
import SaveBar from "../../components/ui/SaveBar";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";

import ImageUploader from "../../components/admin/ImageUploader";

import {
  getAbout,
  updateAbout,
} from "../../services/about.service";

import type { About } from "../../types/about";

export default function AdminAbout() {
  const [form, setForm] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
  try {
    const data = await getAbout();

    console.log("About data:", data);

    setForm(data);
  } catch (err) {
    console.error("About load error:", err);
  } finally {
    setLoading(false);
  }
}

  async function handleSave() {
    if (!form) return;

    try {
      setSaving(true);

      await updateAbout(form);

      alert("저장되었습니다.");
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof About>(
    key: K,
    value: About[K]
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

  if (!form) {
    return <p>데이터가 없습니다.</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        About Settings
      </h1>

      <FormSection
        title="기본 정보"
        description="프로필 정보를 수정합니다."
      >
        <Input
          label="이름"
          value={form.name ?? ""}
          onChange={(e) =>
            updateField("name", e.target.value)
          }
        />

        <Input
          label="직업"
          value={form.job_title ?? ""}
          onChange={(e) =>
            updateField("job_title", e.target.value)
          }
        />

        <Textarea
          label="소개"
          value={form.intro ?? ""}
          onChange={(e) =>
            updateField("intro", e.target.value)
          }
        />
      </FormSection>

      <FormSection
        title="프로필 이미지"
        description="대표 이미지를 변경합니다."
      >
        <ImageUploader
          onUploadComplete={(url) =>
            updateField("profile_image", url)
          }
        />

        {form.profile_image && (
          <img
            src={form.profile_image}
            alt=""
            className="mt-4 h-40 rounded-lg border object-cover"
          />
        )}
      </FormSection>

      <FormSection
        title="기술 스택"
        description="쉼표(,)로 구분해서 입력하세요."
      >
        <Input
          label="Skills"
          value={form.skills.join(", ")}
          onChange={(e) =>
            updateField(
              "skills",
              e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean)
            )
          }
        />
      </FormSection>

      <FormSection
        title="경력"
        description="경력을 입력합니다."
      >
        <Textarea
          label="Career"
          value={form.career ?? ""}
          onChange={(e) =>
            updateField("career", e.target.value)
          }
        />
      </FormSection>

      <FormSection
        title="이력서"
        description="PDF 링크 등을 입력합니다."
      >
        <Input
          label="Resume URL"
          value={form.resume_url ?? ""}
          onChange={(e) =>
            updateField("resume_url", e.target.value)
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