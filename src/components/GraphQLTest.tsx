import React, { useState, useEffect } from 'react';

interface ApiResponse {
  success: boolean;
  posts?: any[];
  error?: string;
  count?: number;
}

const GraphQLTest: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [mdxTest, setMdxTest] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Fetch data from our API endpoints
    const fetchData = async () => {
      try {
        // Try to get blog posts from API
        const postsResponse = await fetch('/api/blog-posts?limit=3');
        const postsData = await postsResponse.json();
        setApiData(postsData);

        // Try to get MDX diagnostic data
        const mdxResponse = await fetch('/api/test-mdx');
        const mdxData = await mdxResponse.json();
        setMdxTest(mdxData);
      } catch (error) {
        setHasError(true);
        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (hasError || (apiData && !apiData.success)) {
    return (
      <div className='resumo_fn_section' id='graphql-test'>
        <div className='container'>
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>API Test</h3>
            <h3 className='title'>API Connection Test</h3>
          </div>

          <div className='test_content'>
            <h4>API Error</h4>
            <p>
              There was an error connecting to the API:{' '}
              {errorMessage || apiData?.error || 'Unknown error'}
            </p>
            <p>
              This is expected during development if you're running without a
              backend.
            </p>
            <h4>Fallback Content</h4>
            <p>
              The application will use static content or direct file reads
              instead.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='resumo_fn_section' id='graphql-test'>
      <div className='container'>
        <div className='resumo_fn_main_title'>
          <h3 className='subtitle'>API Test</h3>
          <h3 className='title'>API Connection Test</h3>
        </div>

        <div className='test_content'>
          <h4>Latest Blog Posts from API</h4>
          <pre>{JSON.stringify(apiData?.posts, null, 2)}</pre>

          <h4>MDX System Diagnostics</h4>
          <pre>{JSON.stringify(mdxTest, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default GraphQLTest;
