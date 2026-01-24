module.exports = {
  async rewrites() {
    return [
      { source: '/', destination: '/public/index.html' },
      { source: '/api/:path*', destination: '/api/:path*' }
    ];
  },
  output: 'standalone'
};
