import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { api } from '../lib/api';
import useStore from '../store/useStore';

export function useActivityFeed() {
  const addActivityEvent = useStore((s) => s.addActivityEvent);

  useEffect(() => {
    // Initial load
    api.getActivity().then((data) => {
      data.events?.forEach((event) => addActivityEvent(event));
    }).catch(() => {
      // Backend not available yet — silently ignore
    });

    // Real-time subscription
    const channel = supabase
      .channel('activity-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'usage_events' },
        (payload) => addActivityEvent(payload.new)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
