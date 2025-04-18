import type { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '../../firebase/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { uid, role } = req.body;

  try {
    await adminAuth.setCustomUserClaims(uid, { role }); // role: 'user' | 'admin' | 'superadmin'
    return res.status(200).json({ message: 'Custom claim set successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to set claims' });
  }
}
