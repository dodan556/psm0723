import { useEffect, useState } from "react";
import { useSettings } from "../../contexts/SettingsContext";

import ImageUploader from "../../components/admin/ImageUploader";

import FormSection from "../../components/ui/FormSection";
import SaveBar from "../../components/ui/SaveBar";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";

import {
  getSettings,
  updateSettings,
} from "../../services/settings.service";

import type { Settings } from "../../types/settings";

export default function AdminSettings() {
  const { reload } = useSettings();

  const [form, setForm] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getSettings();
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

      await updateSettings(form);

      await reload();

      alert("저장되었습니다.");
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) {
    if (!form) return;

    setForm({
      ...form,
      [key]: value,
    });
  }

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>데이터가 없습니다.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Site Settings
      </h1>

      <FormSection
        title="사이트 설정"
        description="사이트 전체 설정을 관리합니다."
      >
        <Input
          label="사이트 제목"
          value={form.site_title ?? ""}
          onChange={(e) =>
            updateField("site_title", e.target.value)
          }
        />

        <Textarea
          label="사이트 설명"
          value={form.site_description ?? ""}
          onChange={(e) =>
            updateField("site_description", e.target.value)
          }
        />

        <Input
          label="SEO 제목"
          value={form.seo_title ?? ""}
          onChange={(e) =>
            updateField("seo_title", e.target.value)
          }
        />

        <Textarea
          label="SEO 설명"
          value={form.seo_description ?? ""}
          onChange={(e) =>
            updateField("seo_description", e.target.value)
          }
        />

        {/* Logo */}
        <div className="space-y-3">
          <label className="block font-semibold">
            Logo
          </label>

          <ImageUploader
            folder="settings"
            onUploadComplete={(url) =>
              updateField("logo_url", url)
            }
          />

          {form.logo_url && (
            <img
              src={form.logo_url}
              alt="Logo"
              className="h-20 rounded border"
            />
          )}
        </div>

        {/* Favicon */}
        <div className="space-y-3">
          <label className="block font-semibold">
            Favicon
          </label>

          <ImageUploader
            folder="settings"
            onUploadComplete={(url) =>
              updateField("favicon_url", url)
            }
          />

          {form.favicon_url && (
            <img
              src={form.favicon_url}
              alt="Favicon"
              className="h-10 w-10 rounded border"
            />
          )}
        </div>

        {/* OG Image */}
        <div className="space-y-3">
          <label className="block font-semibold">
            OG Image
          </label>

          <ImageUploader
            folder="settings"
            onUploadComplete={(url) =>
              updateField("og_image", url)
            }
          />

          {form.og_image && (
            <img
              src={form.og_image}
              alt="OG Image"
              className="w-64 rounded border"
            />
          )}
        </div>

        <Textarea
          label="Footer 문구"
          value={form.footer_text ?? ""}
          onChange={(e) =>
            updateField("footer_text", e.target.value)
          }
        />

        <Input
          label="Copyright"
          value={form.copyright ?? ""}
          onChange={(e) =>
            updateField("copyright", e.target.value)
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