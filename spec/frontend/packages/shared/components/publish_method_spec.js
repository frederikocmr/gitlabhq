import { shallowMount } from '@vue/test-utils';
import PublishMethod from '~/packages/shared/components/publish_method.vue';
import { packageList } from '../../mock_data';

describe('publish_method', () => {
  let wrapper;

  const [packageWithoutPipeline, packageWithPipeline] = packageList;

  const findPipelineRef = () => wrapper.find({ ref: 'pipeline-ref' });
  const findPipelineSha = () => wrapper.find({ ref: 'pipeline-sha' });
  const findManualPublish = () => wrapper.find({ ref: 'manual-ref' });

  const mountComponent = (packageEntity = {}, isGroup = false) => {
    wrapper = shallowMount(PublishMethod, {
      propsData: {
        packageEntity,
        isGroup,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('renders', () => {
    mountComponent(packageWithPipeline);
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('pipeline information', () => {
    it('displays branch and commit when pipeline info exists', () => {
      mountComponent(packageWithPipeline);

      expect(findPipelineRef().exists()).toBe(true);
      expect(findPipelineSha().exists()).toBe(true);
    });

    it('does not show any pipeline details when no information exists', () => {
      mountComponent(packageWithoutPipeline);

      expect(findPipelineRef().exists()).toBe(false);
      expect(findPipelineSha().exists()).toBe(false);
      expect(findManualPublish().exists()).toBe(true);
      expect(findManualPublish().text()).toBe('Manually Published');
    });
  });
});
