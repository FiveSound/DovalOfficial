import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// interface PermissionStatus {
//   status: "granted" | "denied" | "undetermined";
// }

// interface ErrorStatus {
//   message: string;
// }

export const useImagePickerPermissions = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('undetermined');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setStatus(status);
        setHasPermissions(status === 'granted');
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, []);

  return { hasPermissions, status, error };
};
