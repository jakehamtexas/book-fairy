import { downloadZip } from 'client-zip';

export async function downloadArchive({ files, archiveName }: { files: File[]; archiveName: string }) {
  const blob = await downloadZip(files).blob();

  return download({ blob, archiveName });
}

export async function download({ blob, archiveName }: { blob: Blob; archiveName: string }) {
  // Create blob link to download
  const url = window.URL.createObjectURL(new Blob([blob]));

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', archiveName);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode!.removeChild(link);
}
