import { useEffect, useState } from "react";

import FormSection from "../../components/ui/FormSection";
import SaveBar from "../../components/ui/SaveBar";
import Input from "../../components/ui/Input";

import {
  getContact,
  updateContact,
} from "../../services/contact.service";

import type { Contact } from "../../types/contact";

export default function AdminContact() {
  const [form, setForm] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getContact();
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

      await updateContact(form);

      alert("저장되었습니다.");
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof Contact>(
    key: K,
    value: Contact[K]
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
        Contact Settings
      </h1>

      <FormSection
        title="기본 정보"
        description="연락처 정보를 수정합니다."
      >
        <Input
          label="이메일"
          value={form.email ?? ""}
          onChange={(e) =>
            updateField("email", e.target.value)
          }
        />

        <Input
          label="전화번호"
          value={form.phone ?? ""}
          onChange={(e) =>
            updateField("phone", e.target.value)
          }
        />

        <Input
          label="GitHub"
          value={form.github ?? ""}
          onChange={(e) =>
            updateField("github", e.target.value)
          }
        />

        <Input
          label="YouTube"
          value={form.youtube ?? ""}
          onChange={(e) =>
            updateField("youtube", e.target.value)
          }
        />

        <Input
          label="Blog"
          value={form.blog ?? ""}
          onChange={(e) =>
            updateField("blog", e.target.value)
          }
        />

        <Input
          label="Instagram"
          value={form.instagram ?? ""}
          onChange={(e) =>
            updateField("instagram", e.target.value)
          }
        />

        <Input
          label="주소"
          value={form.location ?? ""}
          onChange={(e) =>
            updateField("location", e.target.value)
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