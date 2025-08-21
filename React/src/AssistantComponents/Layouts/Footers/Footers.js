import React from 'react';

export default function Footers() {
  return (
    <footer className="">
      <div className="footer-content">
        <div className="copyright">
          AiPLP &copy; 2023 - {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}