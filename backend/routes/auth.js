const express = require('express');
const jwt = require('jwt-simple');
const router = express.Router();

// Access with passkey
router.post('/access', (req, res) => {
  try {
    const { passkey } = req.body;

    if (!passkey) {
      return res.status(400).json({ error: 'Passkey required' });
    }

    if (passkey !== process.env.PASSKEY) {
      return res.status(401).json({ error: 'Invalid passkey' });
    }

    const token = jwt.encode({ access: true }, process.env.JWT_SECRET);
    res.json({ message: 'Access granted', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
