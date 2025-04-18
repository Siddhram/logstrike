import type { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '../../firebase/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const listUsersResult = await adminAuth.listUsers();
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      role: user.customClaims?.role || 'user',
    }));

    return res.status(200).json({ users });
  } catch (error:any) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}
